import { UserDto, CreateUserDto, UpdateUserDto, UserSearchDto } from './userDto';
import { BaseUserRepository } from "./userRepository"

export class UserService {

    repository: BaseUserRepository;

    constructor() {
        this.repository = new BaseUserRepository();
    }

    /**
     * Set the repository to use for this service
     * @param {baseUserRepository} rep 
     */
    setRepository(rep: BaseUserRepository) {
        this.repository = rep;
    }

    /**
     * Perform a "search" to list users
     * @param {UserSearchDto} params 
     * @returns Promise<Array<UserDto>>
     */
    listUsers = async (params: UserSearchDto) : Promise<Array<UserDto>> => {
        try {       
            const result = await this.repository.search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get a single user record
     * @param {number} id 
     * @returns Promise<Array<UserDto>>
     */
    getUser = async (id: number) : Promise<Array<UserDto>> => {
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

    /**
     * Create a user
     * @param {CreateUserDto} params 
     * @returns 
     */
    createUser = async (params: CreateUserDto) => {
        try {
            const result = await this.repository.create(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a user record
     * @param {number} id 
     * @param {UpdateUserDto} params 
     * @returns Promise<number>
     */
    updateUser = async (id: number, params: UpdateUserDto) : Promise<number> => {
        try {
            const result = await this.repository.update(id, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a user record
     * @param {number} id 
     * @returns Promise<number>
     */
    deleteUser = async (id: number) : Promise<number> => {
        try {
            const result = await this.repository.delete(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}