import { ValidationError } from "../Validation/ValidationError";

export class StudiesEntity {
    
    static MAX_TITLE_LENGTH = 255;

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

    static validateTitle = (title: string) : string => {
        if (title === '' || title == undefined || title == null) {
            throw new ValidationError('Study Title cannot be empty');
        }
        
        if (title.length > StudiesEntity.MAX_TITLE_LENGTH) {
            throw new ValidationError('Supplied Study Title is too long');
        }

        return title;
    }
    
}