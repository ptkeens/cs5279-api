import { ValidationError } from "../Validation/ValidationError";

export class StudiesEntity {
    
    static MAX_TITLE_LENGTH = 255;

    static validateId = (id: number) : number => {

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