import { Request, Response  } from "express";
import { createMenuItemsCategoryService } from "../services/menuItems.category.service";

export async function createMenuItemsCategoryController(req: Request,res: Response) {
    try 
    {
        const {category_id,menu_item_id} = req.body
        const newMenuItemsCategory = await createMenuItemsCategoryService(category_id,menu_item_id)
        res.status(200).json(newMenuItemsCategory)

    } catch (error) {
        console.error("Menu Item Category not created")
        res.status(500).json({error: error})
    }
}