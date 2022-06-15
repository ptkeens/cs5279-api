import express from 'express';
import { UserController } from './userController';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);