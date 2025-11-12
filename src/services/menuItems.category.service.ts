import { AppDataSource } from "../data-source";
import { findOneByCondition, innerJoin, insertDataByDb } from "../DBHandleFunction/DB.Handler";
import { Category } from "../entity/category.entity";
import { MenuItemsCategory } from "../entity/menu_items.category.entity";
import { Menus_items } from "../entity/menuItems.entity";



export async function createMenuItemsCategoryService(category_id: number, menu_item_id: number) {
    try {
        const [exsistingCategory, exsistingMenuItems] = await Promise.all([
            findOneByCondition(AppDataSource,Category,{id: category_id}),
            findOneByCondition(AppDataSource,Menus_items,{id: menu_item_id})
        ])
        if (!exsistingCategory || !exsistingMenuItems) {
            console.error("Category or Menu Item not found")
            throw new Error("Category or Menu Item not found")
        }
        const newMenuItemsCategory = await insertDataByDb(AppDataSource, MenuItemsCategory,{category_id:category_id,menu_item_id:menu_item_id})
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


export async function getAllByIdMenuItemsCategoryService(id: number) {
    try {
        const exsistingCategory = await findOneByCondition(AppDataSource,MenuItemsCategory,{id:id})
        if (!exsistingCategory) {
            console.error("Category not found")
            throw new Error("Category not found")
        }
        const menuItemsCategory = await innerJoin(AppDataSource,MenuItemsCategory,"MenuItemsCategories",{foriegnKeyTable:"menu_item",joinAliasTableName:"menu_items"},id,"id")
        if (!menuItemsCategory) {
            console.error("Menu Item Category not found")
            throw new Error("Menu Item Category not found")
        }
        return menuItemsCategory
    } catch (error) {
        console.error("Menu Item Category not found")
        throw error
    }
}