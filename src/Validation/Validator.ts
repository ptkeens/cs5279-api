import { ValidationError } from "./ValidationError";

export class Validator {

    static validateNumber = (value: any) : number => {
        let num = Number(value);
        if (!isNaN(num)) {
            return num;
        } else {
            throw new ValidationError(`Supplied value is not a valid number`);
        }
    }

    static validateInteger = (value: number) : number => {
        Validator.validateNumber(value);
        
        // if the value is equal to flooring the value, we have an integer
        if (value === Math.floor(value)) {
            return value;
        }
        
        throw new ValidationError(`Supplied value of ${value} is not an integer!`);
    }

    static validatePositiveInteger = (value: number) : number => {
        Validator.validateInteger(value);

        if (value > 0) {
            return value;
        }

        throw new ValidationError(`Supplied value of ${value} is not a positive integer!`);
    }

    static validateStringLength = (str: string, minLength: null|number = null, maxLength: null|number = null) : string => {
        if (minLength && str.length < minLength) {
            throw new ValidationError(`String ${str} is less than required length of ${minLength}`);
        }

        if (maxLength && str.length > maxLength) {
            throw new ValidationError(`String ${str} is greater than required length of ${maxLength}`);
        }

        return str;
    }

    static validateValueInList = (options: string[], value: string) : string => {
        if (options.includes(value)) {
            return value;
        } 
        
        throw new ValidationError(`Supplied value of ${value}, but must be one of ` + options.join(', '));
    }

    static validateDateString = (dateString: string) => {
        const dateObj = new Date(dateString);
        if (!isNaN(dateObj.getDate())) {
            return dateString;
        }

        throw new ValidationError(`Supplied date string of ${dateString} is not valid`);
    }

    
}