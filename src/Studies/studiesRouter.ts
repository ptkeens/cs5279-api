import express from 'express';
import { StudiesController } from './studiesController';
import { authMiddleware } from '../Auth/authMiddleware';

export const studiesRouter = express.Router();
const studiesController = new StudiesController();

studiesRouter.use(authMiddleware);
studiesRouter.get('/', studiesController.getAll);
studiesRouter.get('/:id', studiesController.getOne);
studiesRouter.post('/', studiesController.createStudy);
studiesRouter.put('/:id', studiesController.updateStudy);
studiesRouter.delete('/:id', studiesController.deleteStudy);