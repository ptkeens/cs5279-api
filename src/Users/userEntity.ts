import { UserDto } from './userDto';
import  bcrypt from 'bcrypt';
import { UserValidationError } from './UserValidationError';

export class UserEntity implements UserDto {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    static MAX_FIRSTNAME_LENGTH = 64;
    static MAX_LASTNAME_LENGTH = 64;
    static MAX_EMAIL_LENGTH = 128;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
    }

    setUser = (details: UserDto) : UserEntity => {
        this.id = details.id;
        this.firstName = details.firstName;
        this.lastName = details.lastName;
        this.email = details.email;
        this.password = details.password;

        return this;
    }

    doesPasswordMatchHash = async (password: string) : Promise<boolean> => {
        return await bcrypt.compare(password, this.password);
    }

    static hashPassword = async (password: string) : Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        return hashed;
    }

    static validateId = (id: any) : number => {       
        let num = Number(id);
        if (!isNaN(num)) {
            if (id > 0) {
                return num;
            } else {
                throw new UserValidationError('ID must be a non-negative and non-zero integer');
            }
        } else {
            throw new UserValidationError(`Supplied ID of ${id} is not a valid ID`);
        }
    }

    static validateFirstName = (firstName: string) : string => {
        if (firstName === '' || firstName == undefined || firstName == null) {
            throw new UserValidationError('First name cannot be empty');
        }
        
        if (firstName.length > UserEntity.MAX_FIRSTNAME_LENGTH) {
            throw new UserValidationError('Supplied First name is too long');
        }

        return firstName;
    }

    static validateLastName = (lastName: string) : string => {
        if (lastName === '' || lastName == undefined || lastName == null) {
            throw new UserValidationError('Last name cannot be empty');
        }
        
        if (lastName.length > UserEntity.MAX_LASTNAME_LENGTH) {
            throw new UserValidationError('Supplied Last name is too long');
        }

        return lastName;
    }

    static validateEmail = (email: string) : string => {
        if (email === '' || email == undefined || email == null) {
            throw new UserValidationError('Email cannot be empty');
        }
        
        if (email.length > UserEntity.MAX_EMAIL_LENGTH) {
            throw new UserValidationError('Supplied Email is too long');
        }

        return email;
    }

    static validatePassword = (password: string) : string => {
        if (password === '' || password == undefined || password == null) {
            throw new UserValidationError('Password cannot be empty');
        }

        return password;
    }

}