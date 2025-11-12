import { Request, Response } from "express";
import { createMenuMenuItemsServices, getAllMenuItemsByMenuService } from "../services/menu.menuItems.service";


export async function createMenuMenuItemsController(req: Request,res: Response) {
    try {
        const {menu_id,menu_item_id} = req.body;

        const getNewRecordResult = await createMenuMenuItemsServices(parseInt(menu_id),parseInt(menu_item_id))

        if (!getNewRecordResult) {
            throw new Error("getNewRecordResult is empty")
        }

        res.status(200).json({payload:getNewRecordResult})
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error : ",error.message)
            res.status(500).json({error: error.message})
        }
    }
}


export async function getAllMenuItemsByMenuController(req: Request,res: Response) {
    try {
        const {id} = req.params;
        const paramId: number = parseInt(id) 

        const getNewRecordResult = await getAllMenuItemsByMenuService(paramId)

        if (!getNewRecordResult) {
            console.error("getNewRecordResult is empty")
            throw new Error("getNewRecordResult is empty")
        }

        res.status(200).json({payload: getNewRecordResult})
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error : ", error.message)
            res.status(500).json({error: error.message})
        }
    }
}