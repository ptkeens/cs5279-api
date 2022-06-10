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
    data: object|Array<any>;

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
     * @param code number
     * @returns ApiResponse
     */
    setCode = (code: number) : ApiResponse => {
        this.code = code;
        return this;
    }

    /**
     * Set the error flag
     * @param error boolean
     * @returns ApiResponse
     */
    setError = (error: boolean) : ApiResponse => {
        this.error = error;
        return this;
    }

    /**
     * 
     * @param message string
     * @returns ApiResponse
     */
    setMessage = (message: string) : ApiResponse => {
        this.message = message;
        return this;
    }

    /**
     * Set the data parameter
     * @param data object|Array<any>
     * @returns ApiResponse
     */
    setData = (data: object|Array<any>) : ApiResponse => {
        this.data = data;
        return this;
    }

    /**
     * Convert our ApiResponse into a JSON string
     * @returns string
     */
    toJSON = () : string => {
        let response;

        if (this.error) {
            response = {
                code: this.code,
                error: this.message
            }
        } else {
            response = {
                code: this.code,
                data: this.data
            }
        }

        return JSON.stringify(response);
    }
}