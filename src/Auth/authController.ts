import { Request, Response } from 'express';
import { AuthService } from './authService';

export class AuthController {

    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    checkLogin = async (req: Request, res: Response) => {
        
    }

    login = async (req: Request, res: Response) => {

    }

    logout = async (req: Request, res: Response) => {

    }

}