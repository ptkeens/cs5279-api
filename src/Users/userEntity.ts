import { UserDto } from './userDto';
import  bcrypt from 'bcrypt';
import { ValidationError } from '../Validation/ValidationError';

export class UserEntity implements UserDto {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    static MAX_FIRSTNAME_LENGTH = 64;
    static MAX_LASTNAME_LENGTH = 64;
    static MAX_EMAIL_LENGTH = 128;

    /**
     * Constructor
     */
    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
    }

    /**
     * Populate the user entity with a UserDto
     * @param {UserDto} details 
     * @returns UserEntity
     */
    setUser = (details: UserDto) : UserEntity => {
        this.id = details.id;
        this.firstName = details.firstName;
        this.lastName = details.lastName;
        this.email = details.email;

        if (details.password) {
            this.password = details.password;
        }

        return this;
    }

    /**
     * Does the provided password match the hash in the current record?
     * @param {string} password 
     * @returns Promise<boolean>
     */
    doesPasswordMatchHash = async (password: string) : Promise<boolean> => {
        return await bcrypt.compare(password, this.password);
    }

    /**
     * Hash the current passed-in string
     * @param {string} password 
     * @returns Promise<string>
     */
    static hashPassword = async (password: string) : Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        return hashed;
    }

    /**
     * Validate and return a cleaned ID
     * @param {number} id 
     * @returns number
     */
    static validateId = (id: any) : number => {       
        let num = Number(id);
        if (!isNaN(num)) {
            if (id > 0) {
                return num;
            } else {
                throw new ValidationError('ID must be a non-negative and non-zero integer');
            }
        } else {
            throw new ValidationError(`Supplied ID of ${id} is not a valid ID`);
        }
    }

    /**
     * Validate and return a firstName
     * @param {string} firstName 
     * @returns string
     */
    static validateFirstName = (firstName: string) : string => {
        if (firstName === '' || firstName == undefined || firstName == null) {
            throw new ValidationError('First name cannot be empty');
        }
        
        if (firstName.length > UserEntity.MAX_FIRSTNAME_LENGTH) {
            throw new ValidationError('Supplied First name is too long');
        }

        return firstName;
    }

    /**
     * Validate and return a lastName
     * @param {string} lastName 
     * @returns string
     */
    static validateLastName = (lastName: string) : string => {
        if (lastName === '' || lastName == undefined || lastName == null) {
            throw new ValidationError('Last name cannot be empty');
        }
        
        if (lastName.length > UserEntity.MAX_LASTNAME_LENGTH) {
            throw new ValidationError('Supplied Last name is too long');
        }

        return lastName;
    }

    /**
     * Validate and return an email address
     * @param {string }email 
     * @returns string
     */
    static validateEmail = (email: string) : string => {
        if (email === '' || email == undefined || email == null) {
            throw new ValidationError('Email cannot be empty');
        }
        
        if (email.length > UserEntity.MAX_EMAIL_LENGTH) {
            throw new ValidationError('Supplied Email is too long');
        }

        return email;
    }

    /**
     * Validate and return a password string
     * @param {string} password 
     * @returns string
     */
    static validatePassword = (password: string) : string => {
        if (password === '' || password == undefined || password == null) {
            throw new ValidationError('Password cannot be empty');
        }

        return password;
    }

}