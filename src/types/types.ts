import { refresh_token_repo, user_repo } from "../repositary/repositary"

export const ALLOWED_TABLES = ['Users','RefreshToken'] as const
export type ALLOWED_TABLES_TYPE = typeof ALLOWED_TABLES[number]

export const allRepo = {
    "Users" : user_repo,
    "RefreshToken": refresh_token_repo
}



export type UserRegister = {
    name: string
    email: string
    password: string
}