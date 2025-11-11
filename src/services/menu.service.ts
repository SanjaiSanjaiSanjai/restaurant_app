import { AppDataSource } from "../data-source";
import { findallwithCondition, findOneByCondition, insertDataByDb } from "../DBHandleFunction/DB.Handler";
import { Menus } from "../entity/menu.entity";
import { timeChanger } from "../utils/utils.functions";


type CreateMenu = {
    name: string
    opening_time: string
    closing_time: string
}

type Menu = {
    id: number
    name: string
    open_time: string
    close_time: string
    status: boolean
    created_at: Date
    updated_at: Date
}
// Create a new menu
export const createMenuService = async (menuData: CreateMenu): Promise<Menu> => {
    try {
        const existingMenu = await findOneByCondition(AppDataSource,Menus,{name: menuData.name});
        if (existingMenu) {
            console.error('Menu already exists');
            throw new Error("Menu already exists");
        }
        
        console.log('Menu is not exist');
        const openTime = timeChanger(menuData.opening_time)
        const closeTime = timeChanger(menuData.closing_time)
        const newMenu = await insertDataByDb(AppDataSource,Menus,{name: menuData.name,open_time: openTime,close_time: closeTime});

        if (!newMenu) {
            console.error('Failed to create menu');
            throw new Error('Failed to create menu');
        }

        console.log('Creating new menu:', menuData);
        return newMenu as unknown as Menu;
    } catch (error) {
        console.error('Error in createMenu service:', error);
        throw error;
    }
};

// Get all menus
export const getAllMenusService = async (): Promise<Menu[]> => {
    try {
        const menus = await findallwithCondition(AppDataSource,Menus,{status: true})
        if (menus.length === 0) {
            console.error('No menus found');
            throw new Error('No menus found');
        }
        return menus as unknown as Menu[];
    } catch (error) {
        console.error('Error in getAllMenus service:', error);
        throw error;
    }
};
