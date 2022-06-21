import { Request, Response } from 'express';
import { AuthService } from './authService';

export class AuthController {

    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    checkLogin = async (req: Request, res: Response) => {
        try {

        } catch (err) {

        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const response = await this.authService.processLogin(req);
        } catch (err) {
            
        }
    }

    logout = async (req: Request, res: Response) => {
        try {

        } catch (err) {
            
        }
    }

}