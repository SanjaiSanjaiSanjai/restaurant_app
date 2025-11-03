import { findallwithCondition, findOneByCondition, insertDataByDb } from "../DBHandleFunction/DB.Handler";
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
        const existingMenu = await findOneByCondition("Menu", "name", menuData.name);
        if (existingMenu) {
            console.error('Menu already exists');
            throw new Error("Menu already exists");
        }
        
        console.log('Menu is not exist');
        const openTime = timeChanger(menuData.opening_time)
        const closeTime = timeChanger(menuData.closing_time)
        const newMenu = await insertDataByDb(
            'Menu', // Using Users table as a fallback since Categories is not in ALLOWED_TABLES
            ['name', 'open_time', 'close_time'],
            [menuData.name, openTime, closeTime]
        );

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
        const menus = await findallwithCondition("Menu",[{column:"status",value:true}])
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
