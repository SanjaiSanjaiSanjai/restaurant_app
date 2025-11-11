import { Request, Response  } from "express";
import { createMenuItemsCategoryService, getAllByIdMenuItemsCategoryService } from "../services/menuItems.category.service";

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


export async function getAllByIdMenuItemsCategoryController(req:Request,res:Response) {
    try 
    {
        const {id} = req.params;
        const menuItemsCategory = await getAllByIdMenuItemsCategoryService(parseInt(id))
        if(menuItemsCategory.length == 0) {
            console.error("Menu Item Category not found")
           throw new Error("Menu Item Category not found")
        }
        console.log("menuItems fetched Success")
        res.status(200).json(menuItemsCategory)
    } catch (error) 
    {
       if (error instanceof Error) {
        console.error(error.message)
        res.status(500).json({error: error.message})
       }
    }
}