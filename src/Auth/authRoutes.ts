import express from 'express';
import { AuthController } from './authController';

export const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/checkLogin', authController.checkLogin);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);