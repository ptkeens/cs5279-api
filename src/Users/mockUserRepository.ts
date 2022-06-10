import { baseUserRepository  } from "./userRepository"
import { CreateUserDto, UpdateUserDto, UserSearchDto, UserDto } from "./userDto"

export class MockUserRepository extends baseUserRepository {

    create = async (params: CreateUserDto) => {
        
    }

    update = async (id: number, params: UpdateUserDto) => {

    }

    delete = async (id: number) => {
    
    }

    search = async (params: UserSearchDto) => {
        const users = [
            {
                id: 1,
                firstName: 'Thomas',
                lastName: 'Keens',
                email: 'tkeens@chla.usc.edu'

            } as UserDto,
            {
                id: 2,
                firstName: 'Iris',
                lastName: 'Perez',
                email: 'iaperez@chla.usc.edu'
            } as UserDto
        ];

        return users.filter((item) => {
            if (params.id && item.id != params.id) {
                return false;
            }

            if (params.firstName && item.firstName != params.firstName) {
                return false;
            }

            if (params.lastName && item.lastName != params.lastName) {
                return false;
            }

            if (params.email && item.email != params.email) {
                return false;
            }

            return true;
        });
    }

}