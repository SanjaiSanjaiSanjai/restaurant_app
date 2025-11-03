import { Request, Response } from "express";
import { createMenuService, getAllMenusService } from "../services/menu.service";

export async function menuCreateController(req:Request,res:Response) {
    try {
        const {name,opening_time,closing_time,} = req.body;
        const menuServiceRecordRecord = await createMenuService({name,opening_time,closing_time,});
        console.log("Menu created successfully");
        return res.status(200).json({message:"Menu created successfully",data:menuServiceRecordRecord});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error});
    }
}


export async function menuGetAllController(req:Request,res:Response) {
    try {
        const menuServiceRecordRecord = await getAllMenusService();
        console.log("Menus fetched successfully");
        return res.status(200).json({message:"Menus fetched successfully",data:menuServiceRecordRecord});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error});
    }
}