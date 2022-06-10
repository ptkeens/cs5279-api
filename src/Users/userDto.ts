export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface UserSearchDto {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}