import { Request, Response } from 'express';
import { ApiResponse } from '../ApiResponse/apiResponse';
import { UserSearchDto } from './userDto';
import { userRepository } from './userRepository';
import { UserService } from "./userService";

export class UserController {

    userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.userService.setRepository(
            new userRepository()
        );
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.listUsers(req.query);
            const response = new ApiResponse();
            response
                .setCode(ApiResponse.HTTP_OK)
                .setData(result);

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            console.log(err);
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getUser(
                parseInt(req.params.id)
            );
            const response = new ApiResponse();

            if (result.length) {
                response
                    .setCode(ApiResponse.HTTP_OK)
                    .setData(result);
            } else {
                response
                    .setCode(ApiResponse.HTTP_NOT_FOUND)
                    .setError(true)
                    .setMessage('Resource not found!');
            }

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            console.log(err);
        }    
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.createUser(req.body);
            const response = new ApiResponse();

            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.userService.updateUser(id, req.body);
            const response = new ApiResponse();

            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.userService.deleteUser(id);
            const response = new ApiResponse();

            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    
}