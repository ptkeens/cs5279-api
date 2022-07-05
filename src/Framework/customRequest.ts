import { Request } from 'express';
import { UserDto } from '../Users/userDto';
import { UserTokenDto } from '../UserTokens/userTokenDto';

export interface CustomRequest extends Request {
    userInfo?: UserDto;
}