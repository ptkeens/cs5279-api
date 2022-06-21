import { Request } from "express"
import { UserDto, UserSearchDto } from "../Users/userDto";
import { CreateUserTokenDto, UserTokenDto } from "../UserTokens/userTokenDto";
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
        const ipAddress = request.ip;

        try {
            if (email && password) {
                const user = await this.locateUserByEmailAndPassword(email, password);
                const token = await this.generateAndStoreTokenForUser(user, ipAddress);

                return {
                    user,
                    token
                }
            } else {
                throw new Error("Must supply both a username and password");
            }
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

    generateAndStoreTokenForUser = async (user: UserDto, ipAddress: string) : Promise<UserTokenDto> => {
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
            throw err;
        }
    }

}