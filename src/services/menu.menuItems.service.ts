import { ObjectLiteral } from "typeorm"
import { AppDataSource } from "../data-source"
import { innerJoin, insertDataByDb } from "../DBHandleFunction/DB.Handler"
import { menuMenuItems } from "../entity/menu.menuItems.entity"


export async function createMenuMenuItemsServices(menu_id: number,menu_item_id: number): Promise<ObjectLiteral> {
    try {
        if (typeof menu_id != "number" && typeof menu_item_id != "number") {
            console.error("must type is number menu_id both menu_item_id")
            throw new Error("must type is number menu_id both menu_item_id")
        }

        const newMenuMenuItemRecord = await insertDataByDb(AppDataSource,menuMenuItems,{menus_id: menu_id,menu_items_id: menu_item_id})

        if (!newMenuMenuItemRecord) {
            console.error("newMenuMenuItemRecord is does'nt create there is empty")
            throw new Error("newMenuMenuItemRecord is does'nt create there is empty")
        }

        return newMenuMenuItemRecord
    } catch (error) {
        throw error
    }
}


export async function getAllMenuItemsByMenuService(id: number) {
    try {
        if (typeof id != "number") {
            console.error("must id type is number!")
            throw new Error("must id type is number")
        }

        const getAllMenuMenuItemsRecords = await innerJoin(AppDataSource,menuMenuItems,"menuMenuItem",{foriegnKeyTable: "menus_id",joinAliasTableName: "menuTable"},id,"menus_id",[{joinTableColumn: "menu_items_id",joinTableColumnAlias: "menuItemTable"}])
        if (getAllMenuMenuItemsRecords.length  == 0) {
            console.error("getAllMenuMenuItemsRecords is empty")
            throw new Error("getAllMenuMenuItemsRecords is empty")
        }

        return getAllMenuMenuItemsRecords
    } catch (error) {
        throw error
    }
}