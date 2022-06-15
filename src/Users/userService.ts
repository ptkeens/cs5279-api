import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserSearchDto } from './userDto';
import { baseUserRepository } from "./userRepository"
import { UserValidationError } from './UserValidationError';


export class UserService {

    repository: baseUserRepository;

    constructor() {
        this.repository = new baseUserRepository();
    }

    setRepository(rep: baseUserRepository) {
        this.repository = rep;
    }

    listUsers = async (params: UserSearchDto) => {
        try {       
            const result = await this.repository.search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    getUser = async (id: number) => {
        try {
            const params = {
                id
            } as UserSearchDto;
        
            const result = await this.repository.search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    createUser = async (params: CreateUserDto) => {
        try {
            const result = await this.repository.create(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    updateUser = async (id: number, params: UpdateUserDto) => {
        try {
            const result = await this.repository.update(id, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    deleteUser = async (id: number) => {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}