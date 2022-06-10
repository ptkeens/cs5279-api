import express from 'express';
import { UserController } from './userController';

export const authRouter = express.Router();
const userController = new UserController();