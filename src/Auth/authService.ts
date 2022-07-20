import { Request } from "express"
import { UserDto, UserSearchDto } from "../Users/userDto";
import { UpdateUserTokenDto, UserTokenDto } from "../UserTokens/userTokenDto";
import { UserRepository } from "../Users/userRepository";
import { UserTokenRepository } from "../UserTokens/userTokenRepository";
import { UserEntity } from "../Users/userEntity";
import { DatabaseError } from "../Database/databaseError";
import { AuthenticationError } from "./AuthenticationError";
import { UserTokenEntity } from "../UserTokens/userTokenEntity";
import { BaseService } from "../Framework/baseService";

export class AuthService extends BaseService {

    /**
     * 
     * @param {Request} request 
     * @returns Promise<object>
     */
    processLogin = async (request: Request) : Promise<{}> => {
        const email = request.body?.email;
        const password = request.body?.password;
        const ipAddress = request.socket.remoteAddress?.split(':').pop();

        try {
            if (email && password) {
                const user = await this.locateUserByEmailAndPassword(email, password);
                const token = await this.generateAndStoreTokenForUser(user, ipAddress);

                // strip password from response
                delete user.password;

                return {
                    userDetails: user,
                    token: token.token,
                    expires: token.expires
                }
            } else {
                throw new Error('Must supply both a username and password');
            }
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }

            throw err;
        }
    }

    /**
     * 
     * @param {Request} request 
     * @returns Promise<object>
     */
    checkLogin = async (request: Request) : Promise<{}> => {
        const token = request.body.token;

        try {
            if (token) {
                const tokenDto = await this.isValidToken(token);
                const updatedToken = await this.extendToken(tokenDto);
                
                return {
                    token: updatedToken
                }
            }

            throw new Error('Missing required parameters for checkLogin');
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }

            throw err;
        }
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns Promise<UserDto>
     */
    locateUserByEmailAndPassword = async (email: string, password: string) : Promise<UserDto> => {
        try {
            const entity = new UserEntity();
            const results = await this.getRepository<UserRepository>('user').search({
                email
            } as UserSearchDto);
    
            // start pessimmistic
            let authResult = false;
    
            if (results) {
                for (let row of results) {
                    entity.setUser(row);
                    authResult = await entity.doesPasswordMatchHash(password);
                    
                    if (authResult) {
                        return row;
                    }
                }    
            }

            throw new Error('Unable to find matching user');
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }
            throw err;
        }
        
    }

    /**
     * 
     * @param {UserDto} user 
     * @param {string|undefined} ipAddress 
     * @returns Promise<UserTokenDto>
     */
    generateAndStoreTokenForUser = async (user: UserDto, ipAddress: string|undefined) : Promise<UserTokenDto> => {
        try {
            const params = {
                token: UserTokenEntity.generateRandomToken(),
                userId: user.id,
                remoteAddress: ipAddress,
                expires: Math.floor(Date.now() / 1000) + UserTokenEntity.DEFAULT_TIMEOUT
            } as UserTokenDto;

            const result = await this.getRepository<UserTokenRepository>('token').create(params);
            if (result) {
                return params;
            }

            throw new Error('Error when generating token for user');
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }
            throw err;
        }
    }

    /**
     * 
     * @param {string|null} token 
     * @returns Promise<UserTokenDto>
     */
    isValidToken = async (token: string|null) : Promise<UserTokenDto> => {
        try {
            if (token === null) {
                throw new Error('Invalid token');
            }

            const result = await this.getRepository<UserTokenRepository>('token').search({
                token,
                expiresGt: Math.floor(Date.now() / 1000)
            });

            if (result.length) {
                return result[0];
            }

            throw new Error('Token not found or has expired');
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }
            throw err;
        }
    }

    /**
     * 
     * @param {UserTokenDto} token 
     * @returns Promise<UpdateUserTokenDto>
     */
    extendToken = async (token: UserTokenDto) : Promise<UpdateUserTokenDto> => {
        try {
            const newExpires = Math.floor(Date.now() / 1000) + UserTokenEntity.DEFAULT_TIMEOUT;

            const updateTokenRequest = {
                token: token.token,
                userId: token.userId,
                expires: newExpires,
                remoteAddress: token.remoteAddress
            };

            const result = await this.getRepository<UserTokenRepository>('token').update(updateTokenRequest);

            if (result) {
                return updateTokenRequest;
            }

            throw new Error('Unable to extend token');


        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }
        
            throw err;
        }
    }

    getUserFromToken = async (token: string|null) : Promise<UserDto> => {
        try {
            const tokenResult = await this.isValidToken(token);
            const userResult = await this.getRepository<UserRepository>('user')
                .search({
                    id: tokenResult.userId
            });

            const user = userResult[0];
            user.token = tokenResult;
            return user;
        } catch (err) {
            if (err instanceof Error && !(err instanceof DatabaseError)) {
                throw new AuthenticationError(err.message);
            }
            throw err;            
        }
    }

    /**
     * 
     * @param {Request} req 
     * @returns string|null
     */
    static extractTokenFromRequest = (req: Request) :string|null => {
        const authString = req.headers?.authorization;
        let token = null;
     
        if (authString) {
            let parts = authString.split(' ');
            if (parts[0].toLowerCase().includes('bearer')) {
                token = parts[1].trim();
            }
        }

        return token;
    }

}