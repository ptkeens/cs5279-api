import crypto from 'crypto';
import { ValidationError } from '../Validation/ValidationError';


export class UserTokenEntity {


    static DEFAULT_TIMEOUT = 3600;

    /**
     * Generate a random token from random bytes
     * @returns string
     */
    static generateRandomToken = () => {
        const buf = crypto.randomBytes(30);
        return buf.toString('hex');
    }

    /**
     * Validate the supplied token
     * @param {string} token 
     * @returns string
     */
    static validateToken = (token: string) => {
        if (token === '' || token === undefined || token === null) {
            throw new ValidationError('Last name cannot be empty');
        }
        
        if (token.length != 60) {
            throw new ValidationError('Supplied token is not the correct length');
        }

        return token;
    }

    /**
     * Validate a supplied user ID
     * @param {nubmer} id 
     * @returns number
     */
    static validateUserId = (id: number) => {
        let num = Number(id);
        if (!isNaN(num)) {
            if (num > 0) {
                return num;
            } else {
                throw new ValidationError('User Id must be a non-negative and non-zero integer');
            }
        } else {
            throw new ValidationError(`Supplied id of ${num} is not a valid User ID`);
        }
    }

    /**
     * Validate the supplied expire value
     * @param {number} expires 
     * @returns number
     */
    static validateExpires = (expires: number) => {
        let num = Number(expires);
        if (!isNaN(num)) {
            if (num > 0) {
                return num;
            } else {
                throw new ValidationError('User Id must be a non-negative and non-zero integer');
            }
        } else {
            throw new ValidationError(`Supplied id of ${num} is not a valid User ID`);
        }
    }

    /**
     * Validate an IP address
     * @param {string} ip 
     * @returns string
     */
    static validateRemoteAddress = (ip: string) => {
        if (ip === '' || ip === undefined || ip === null) {
            throw new ValidationError('IP address cannot be empty');
        }
        
        if (ip.length != 15) {
            throw new ValidationError('Supplied IP not a valid IPV4 IP');
        }

        return ip;
    }
}