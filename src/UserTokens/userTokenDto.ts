export interface UserTokenDto {
    token: string,
    userId: number,
    expires: number,
    remoteAddress: number
}

export interface CreateUserTokenDto extends UserTokenDto {}

export interface UpdateUserTokenDto extends UserTokenDto {}

export interface UserTokenSearchDto extends UserTokenDto {}