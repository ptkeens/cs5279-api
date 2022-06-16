import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { authRouter } from './Auth/authRoutes';
import { ApiResponse } from './ApiResponse/apiResponse';
import { userRouter } from './Users/userRoutes';

const app: Express = express();
const port = process.env.PORT || 80;

// Inject POST data middleware
app.use(express.urlencoded({extended: true}));

// Auth routes
app.use('/auth', authRouter);

// User routes
app.use('/users', userRouter);

// Patient routes

// Study routes


// Setup our fall-through handler
app.get('*', (req: Request, res: Response) => {
  const response = new ApiResponse()
    .setCode(ApiResponse.HTTP_NOT_FOUND)
    .setError(true)
    .setMessage('Resource Not Found');

    res.status(response.code).send(response.getResponse());
});

// initialize our app
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});