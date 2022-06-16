import { Request, Response } from 'express';
import { ApiResponse } from '../ApiResponse/apiResponse';
import { UserRepository } from './userRepository';
import { UserService } from "./userService";
import { UserValidationError } from './UserValidationError';

export class UserController {

    userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.userService.setRepository(
            new UserRepository()
        );
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
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


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
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

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    createUser = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.createUser(req.body);
            const response = new ApiResponse();

            console.log(result);
        } catch (err) {
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof UserValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */    
    updateUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.userService.updateUser(id, req.body);
            const response = new ApiResponse();

            if (result) {
                response.setCode(ApiResponse.HTTP_OK);
            } else {
                response
                    .setCode(ApiResponse.HTTP_NOT_FOUND)
                    .setError(true)
                    .setMessage('Resource not found');
            }

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof UserValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */    
    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.userService.deleteUser(id);
            const response = new ApiResponse();

            if (result) {
                response.setCode(ApiResponse.HTTP_OK);
            } else {
                response
                    .setCode(ApiResponse.HTTP_NOT_FOUND)
                    .setError(true)
                    .setMessage('Resource not found');
            }

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof UserValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    
}