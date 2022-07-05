export class ApiResponse {

    static HTTP_OK = 200;
    static HTTP_BAD_REQUEST = 400;
    static HTTP_UNAUTHORIZED = 401;
    static HTTP_FORBIDDEN = 403;
    static HTTP_NOT_FOUND = 404;
    static HTTP_ERROR = 500;

    code: number;
    error: boolean;
    message: string;
    data: object|Array<any>|undefined;

    /**
     * Iniitalize our object
     */
    constructor() {
        this.code = 0;
        this.error = false;
        this.message = '';
        this.data = [];
    }

    /**
     * Set the current "code"
     * @param {number} code
     * @returns ApiResponse
     */
    setCode = (code: number) : ApiResponse => {
        this.code = code;
        return this;
    }

    /**
     * Set the error flag
     * @param {boolean} error
     * @returns ApiResponse
     */
    setError = (error: boolean) : ApiResponse => {
        this.error = error;
        return this;
    }

    /**
     * 
     * @param {string} message
     * @returns ApiResponse
     */
    setMessage = (message: string) : ApiResponse => {
        this.message = message;
        return this;
    }

    /**
     * Set the data parameter
     * @param {object|Array<any>} data
     * @returns ApiResponse
     */
    setData = (data: object|Array<any>|undefined) : ApiResponse => {
        this.data = data;
        return this;
    }

    /**
     * format and return our response
     * @returns {object}
     */
    getResponse = () : object => {
        let response;

        if (this.error) {
            response = {
                error: this.message
            }
        } else {
            response = {
                data: this.data
            }
        }

        return response;
    }
}