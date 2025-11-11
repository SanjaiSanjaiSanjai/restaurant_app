import { AppDataSource } from "../data-source";
import { findallwithCondition, findOneByCondition, insertDataByDb } from "../DBHandleFunction/DB.Handler";
import { Menus_items } from "../entity/menuItems.entity";

type CreateMenuItems = {
    name: string,
    description: string
}

export interface Menu_items{
    id: number,
    name: string,
    description: string,
    status: boolean,
    created_at: Date,
    updated_at: Date
}
// Create a new menu item
export const createMenuItemsService = async (menu_items: CreateMenuItems): Promise<Menu_items> => {
    try {
        const exsistingMenuItems = await findOneByCondition(AppDataSource,Menus_items,{name: menu_items.name})
        if (exsistingMenuItems) {
            console.error("[createMenuItemsService]: Menu Items is already available")
            throw new Error("Menu Items is already available")
        }
        console.log(`[createMenuItemsService]: ${menu_items.name} this menus is not available db`)
        const newMenuItemsDB = await insertDataByDb(AppDataSource,Menus_items,{name:menu_items.name,description: menu_items.description})
        if (!newMenuItemsDB) {
            console.error("[createMenuItemsService]: Not create menu items in db")
            throw new Error("Not create menu items in db")
        }
        console.log("Successfully created");
        return newMenuItemsDB as Menu_items
    }
    catch (error) {
        console.error("[createMenuItemsService]: Failed creat")
        throw error
    }
};

// Get all menu items
export const getAllMenuItemsService = async (): Promise<Menu_items[]> => {
    try {
        const menu_items = await findallwithCondition(AppDataSource,Menus_items,{status: true});
        if (menu_items.length === 0) {
            console.error('No menu items found');
            throw new Error('No menu items found');
        }
        return menu_items as unknown as Menu_items[];
    } catch (error) {
        console.error('Error in getAllMenuItems service:', error);
        throw error;
    }
};

