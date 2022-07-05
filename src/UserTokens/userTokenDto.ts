export interface UserTokenDto {
    token: string,
    userId: number,
    expires: number,
    remoteAddress: string
}

export interface CreateUserTokenDto extends UserTokenDto {}

export interface UpdateUserTokenDto extends UserTokenDto {}

export interface UserTokenSearchDto {
    token?: string,
    userId?: number,
    expires?: number,
    expiresGt?: number,
    expiresLt?: number,
    remoteAddress?: string,
    limit?: number,
    offset?: number,
    sort?: string
}