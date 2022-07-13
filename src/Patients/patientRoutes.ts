import express from 'express';
import { authMiddleware } from '../Auth/authMiddleware';
import { PatientController } from './patientController';

export const patientRouter = express.Router();
const patientController = new PatientController();

patientRouter.use(authMiddleware);
patientRouter.get('/', patientController.getAll);
patientRouter.get('/:id', patientController.getOne);
patientRouter.post('/', patientController.createPatient);
patientRouter.put('/:id', patientController.updatePatient);
patientRouter.delete('/:id', patientController.deletePatient);