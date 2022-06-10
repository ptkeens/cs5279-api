export class DatabaseError extends Error {

    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

}