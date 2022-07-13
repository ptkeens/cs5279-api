import { Request, Response } from 'express';
import { ApiResponse } from '../ApiResponse/apiResponse';
import { ValidationError } from '../Validation/ValidationError';
import { PatientRepository } from "./patientRepository";
import { PatientService } from "./patientService";

export class PatientController {

    patientService: PatientService;

    constructor() {
        this.patientService = new PatientService();
        this.patientService.setRepository('patient',
            new PatientRepository()
        );
    }

    /**
     * getAll
     * @param {Request} req 
     * @param {Response} res 
     */
     getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.patientService.listPatients(req.query);
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
            const result = await this.patientService.getPatient(
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
     * Create a Patient
     * @param {Request} req 
     * @param {Response} res 
     */
     createPatient = async (req: Request, res: Response) => {
        try {
            const result = await this.patientService.createPatient(req.body);
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
     * Update a Patient
     * @param {Request} req 
     * @param {Response} res 
     */    
     updatePatient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.patientService.updatePatient(id, req.body);
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
     * Delete a Patient
     * @param {Request} req 
     * @param {Response} res 
     */    
    deletePatient = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params?.id);

            const result = await this.patientService.deletePatient(id);
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