import { Response, NextFunction } from "express";
import { CustomRequest } from "../Framework/customRequest";
import { AuthService } from "./authService";
import { AuthenticationError } from "./AuthenticationError";
import { ApiResponse } from '../ApiResponse/apiResponse';
import { UserTokenRepository } from "../UserTokens/userTokenRepository";
import { UserRepository } from "../Users/userRepository";

export const authMiddleware = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const svcObj = new AuthService();
        svcObj.setRepository('token', new UserTokenRepository());
        svcObj.setRepository('user', new UserRepository());

        const token = AuthService.extractTokenFromRequest(request);
        const result = await svcObj.getUserFromToken(token);

        if (result) {
            request.userInfo = result;
            return next();
        } else {
            throw new AuthenticationError('Invalid token');
        }
    } catch (err) {
        const apiResponse = new ApiResponse();
        apiResponse.setError(true);

        if (err instanceof AuthenticationError) {
            apiResponse
                .setCode(ApiResponse.HTTP_UNAUTHORIZED)
                .setMessage(err.message);
        } else {
            apiResponse.setCode(ApiResponse.HTTP_ERROR)
            .setMessage('Something went wrong');
        }

        response.status(apiResponse.code).send(apiResponse.getResponse());
    }
}