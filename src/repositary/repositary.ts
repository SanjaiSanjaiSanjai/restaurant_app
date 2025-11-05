import { Users } from "../entity/User.entity";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/refreshToken.entity";
import { Category } from "../entity/category.entity";
import { Menus_items } from "../entity/menuItems.entity";
import { Menus } from "../entity/menu.entity";
import { MenuItemsCategory } from "../entity/menu_items.category.entity";

/**
 * Repository for Users table in database 
 * @type {Repository<Users>}
 * @type {Repository<RefreshToken>}
 * @type {Repository<Category>}
 * @type {Repository<Menus_items>}
 * @type {Repository<Menus>}
 */

export const user_repo = AppDataSource.getRepository(Users)         
export const refresh_token_repo = AppDataSource.getRepository(RefreshToken)         
export const category_repo = AppDataSource.getRepository(Category)         
export const menus_items_repo = AppDataSource.getRepository(Menus_items)         
export const menus_repo = AppDataSource.getRepository(Menus) 
export const menu_items_category_repo = AppDataSource.getRepository(MenuItemsCategory)         