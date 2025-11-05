import { findOneByCondition, insertDataByDb } from "../DBHandleFunction/DB.Handler";


export async function createMenuItemsCategoryService(category_id:number,menu_item_id:number) {
    try 
    {
        const [exsistingCategory,exsistingMenuItems] = await Promise.all([
            findOneByCondition("Categories","id",category_id),
            findOneByCondition("Menu_items","id",menu_item_id)
        ])
        if(!exsistingCategory || !exsistingMenuItems) {
            console.error("Category or Menu Item not found")
            throw new Error("Category or Menu Item not found")
        }

        const newMenuItemsCategory = await insertDataByDb("MenuItemsCategories",["category_id","menu_item_id"],[category_id,menu_item_id])
        if (!newMenuItemsCategory) {
            console.error("Menu Item Category not created")
            throw new Error("Menu Item Category not created")
        }
        return newMenuItemsCategory
    } catch (error) {
        console.error("Menu Item Category not created")
        throw error
    }
}