import express from 'express';
import { authMiddleware } from '../Auth/authMiddleware';
import { UserController } from './userController';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.use(authMiddleware);
userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);