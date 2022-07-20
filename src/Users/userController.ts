import { Request, Response } from 'express';
import { ApiResponse } from '../ApiResponse/apiResponse';
import { ValidationError } from '../Validation/ValidationError';
import { UserRepository } from './userRepository';
import { UserService } from "./userService";

export class UserController {

    userService: UserService;

    /**
     * Constructor
     */
    constructor() {
        this.userService = new UserService();
        this.userService.setRepository(
            'user', new UserRepository()
        );
    }

    /**
     * getAll
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
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof ValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }


    /**
     * getOne
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
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof ValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }    
    }

    /**
     * createUser
     * @param {Request} req 
     * @param {Response} res 
     */
    createUser = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.createUser(req.body);
            const response = new ApiResponse();

            if (result) {
                response.setCode(ApiResponse.HTTP_OK);
            } else {
                response
                    .setCode(ApiResponse.HTTP_ERROR)
                    .setError(true)
                    .setMessage('Resource could not be created');
            }

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof ValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    /**
     * updateUser
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
                    .setCode(ApiResponse.HTTP_ERROR)
                    .setError(true)
                    .setMessage('Resource could not be updated');
            }

            res.status(response.code).send(response.getResponse());
        } catch (err) {
            const response = new ApiResponse();
            response.setError(true);
            if (err instanceof ValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    /**
     * deleteUser
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
            if (err instanceof ValidationError) {
                response
                    .setCode(ApiResponse.HTTP_BAD_REQUEST)
                    .setMessage(err.message);
                res.status(response.code).send(response.getResponse());
            }
        }
    }

    
}