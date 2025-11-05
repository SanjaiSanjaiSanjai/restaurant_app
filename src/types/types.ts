import { category_repo, menu_items_category_repo, menus_items_repo, menus_repo, refresh_token_repo, user_repo } from "../repositary/repositary"

export const ALLOWED_TABLES = ['Users','RefreshToken','Categories','Menu_items','Menu','MenuItemsCategories'] as const
export type ALLOWED_TABLES_TYPE = typeof ALLOWED_TABLES[number]

export const allRepo = {
    "Users" : user_repo,
    "RefreshToken": refresh_token_repo,
    "Categories": category_repo,
    "Menu_items": menus_items_repo,
    "Menu": menus_repo,
    "MenuItemsCategories": menu_items_category_repo
}



export type UserRegister = {
    name: string
    email: string
    password: string
}

 interface UserLogin {
    email: string
    password: string
}

export type ReadonlyLoginUserType = Readonly<UserLogin>