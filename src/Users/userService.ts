import { baseUserRepository } from "./userRepository"

export class UserService {

    repository: baseUserRepository;

    constructor() {
        this.repository = new baseUserRepository();
    }

    setRepository(rep: baseUserRepository) {
        this.repository = rep;
    }

    getUser = () => {

    }
    
    searchUsers = () => {

    }

    createUser = (req: Request) => {
        
    }

    updateUser = (id: number, req: Request) => {

    }

    dropUser = () => {

    }
}