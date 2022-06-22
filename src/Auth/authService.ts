import { Request } from "express"
import { UserDto, UserSearchDto } from "../Users/userDto";
import { CreateUserTokenDto, UpdateUserTokenDto, UserTokenDto, UserTokenSearchDto } from "../UserTokens/userTokenDto";
import { BaseUserRepository } from "../Users/userRepository";
import { BaseUserTokenRepository } from "../UserTokens/userTokenRepository";
import { UserEntity } from "../Users/userEntity";
import { DatabaseError } from "../Database/databaseError";
import { AuthenticationError } from "./AuthenticationError";
import { UserTokenEntity } from "../UserTokens/userTokenEntity";

export class AuthService {
    
    userRepository: BaseUserRepository;
    tokenRepository: BaseUserTokenRepository;

    constructor() {
        this.userRepository = new BaseUserRepository();
        this.tokenRepository = new BaseUserTokenRepository();
    }

    /**
     * Set the User repository to use for this service
     * @param {baseUserRepository} rep 
     */
    setUserRepository(rep: BaseUserRepository) {
        this.userRepository = rep;
    }

    /**
     * Set the Token repository to use for this service
     * @param {baseUserTokenRepository} rep 
     */
    setUserTokenRepository(rep: BaseUserTokenRepository) {
        this.tokenRepository = rep;
    }

    processLogin = async (request: Request) => {
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
            console.log(err);
            if (err !instanceof DatabaseError) {
                throw new AuthenticationError(err.message);
            }

            throw err;
        }
    }

    checkLogin = async (request: Request) : Promise<UpdateUserTokenDto|undefined> => {
        const userId = request.body.userId;
        const token = request.body.token;

        try {
            if (userId && token) {
                const tokenDto = await this.isValidToken(token, userId);
                const updatedToken = await this.extendToken(tokenDto);
                
                return updatedToken;
            }

            throw new Error('Missing required parameters for checkLogin');
        } catch (err) {
            console.log(err);
            if (err !instanceof DatabaseError) {
                throw new AuthenticationError(err.message);
            }

            throw err;
        }
    }

    locateUserByEmailAndPassword = async (email: string, password: string) : Promise<UserDto> => {
        try {
            const entity = new UserEntity();
            const results = await this.userRepository.search({
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
            throw err;
        }
        
    }

    generateAndStoreTokenForUser = async (user: UserDto, ipAddress: string|undefined) : Promise<UserTokenDto> => {
        try {
            const params = {
                token: UserTokenEntity.generateRandomToken(),
                userId: user.id,
                remoteAddress: ipAddress,
                expires: Math.floor(Date.now() / 1000) + UserTokenEntity.DEFAULT_TIMEOUT
            } as UserTokenDto;

            const result = await this.tokenRepository.create(params);
            if (result) {
                return params;
            }

            throw new Error('Error when generating token for user');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    isValidToken = async (token: string, userId: number) : Promise<UserTokenDto> => {
        try {
            const result = await this.tokenRepository.search({
                token,
                userId,
                expiresGt: Math.floor(Date.now() / 1000)
            });

            if (result) {
                return result[0];
            }

            throw new Error('Token not found or has expired');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    extendToken = async (token: UserTokenDto) => {
        try {
            const newExpires = Date.now() + UserTokenEntity.DEFAULT_TIMEOUT;

            const updateTokenRequest: UpdateUserTokenDto = {
                token: token.token,
                userId: token.userId,
                expires: newExpires,
                remoteAddress: token.remoteAddress
            };

            try {
                const result = await this.tokenRepository.update(updateTokenRequest);

                if (result) {
                    return updateTokenRequest;
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}