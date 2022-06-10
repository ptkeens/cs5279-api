import { UserService } from "./userService";

export class UserController {

    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAll = async (req: Request, res: Response) => {
        return this.userService.createUser(req);
    }

}