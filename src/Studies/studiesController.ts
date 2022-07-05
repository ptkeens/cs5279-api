import { StudiesService } from "./studiesService";
import { StudiesRepository } from "./studiesRepository";
import { Request, Response } from "express";

export class StudiesController {

    studiesService: StudiesService;

    /**
     * Constructor
     */
    constructor() {
        this.studiesService = new StudiesService();
        this.studiesService.setRepository(
            'user', new StudiesRepository()
        );
    }

    getAll = async (request: Request, response: Response) => {

    }

    getOne = async (request: Request, response: Response) => {

    }

    createStudy = async (request: Request, response: Response) => {

    }

    updateStudy = async (request: Request, response: Response) => {

    }

    deleteStudy = async (request: Request, response: Response) => {

    }

}