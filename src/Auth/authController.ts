import { Request, Response } from 'express';
import { UserRepository } from '../Users/userRepository';
import { UserTokenRepository } from '../UserTokens/userTokenRepository';
import { AuthService } from './authService';
import { ApiResponse } from '../ApiResponse/apiResponse';

export class AuthController {

    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.authService.setUserRepository(
            new UserRepository()
        );
        this.authService.setUserTokenRepository(
            new UserTokenRepository()
        );
    }

    checkLogin = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.checkLogin(req);
            const response = new ApiResponse();
            response
                .setCode(ApiResponse.HTTP_OK)
                .setData(result);

            res.status(response.code).send(response.getResponse());
        } catch (err) {

        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.processLogin(req);
            const response = new ApiResponse();
            response
                .setCode(ApiResponse.HTTP_OK)
                .setData(result);

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            
        }
    }

    logout = async (req: Request, res: Response) => {
        try {

        } catch (err) {
            
        }
    }

}