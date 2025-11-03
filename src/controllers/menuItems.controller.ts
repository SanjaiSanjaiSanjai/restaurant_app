import {Request, Response} from 'express'
import { createMenuItemsService, getAllMenuItemsService } from '../services/menuItems.service';

// Create a new menu item
export const createMenuItemsController = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const menu_item_record_result = await createMenuItemsService({ name, description });
        res.status(201).json({message: "Successfully created", menu_item_record_result});
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: error });
    }
};

// Get all menu items
export const getAllMenuItemsController = async (req: Request, res: Response) => {
    try {
        const menu_items = await getAllMenuItemsService();
        console.log("Successfully fetch menu items")
        res.status(201).json(menu_items);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
};

