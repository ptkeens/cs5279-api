import { StudiesService } from "./studiesService";
import { StudiesRepository } from "./studiesRepository";
import { Request, Response } from "express";
import { ApiResponse } from "../ApiResponse/apiResponse";
import { ValidationError } from "../Validation/ValidationError";

export class StudiesController {

    studiesService: StudiesService;

    /**
     * Constructor
     */
    constructor() {
        this.studiesService = new StudiesService();
        this.studiesService.setRepository(
            'studies', new StudiesRepository()
        );
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.studiesService.listStudies(req.query);
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
            console.log(err);
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const result = await this.studiesService.getStudy(
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

    createStudy = async (req: Request, res: Response) => {
        try {
            const result = await this.studiesService.createStudy(req.body);
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

    updateStudy = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.studiesService.updateStudy(id, req.body);
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

    deleteStudy = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.studiesService.deleteStudy(id);
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