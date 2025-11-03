import { Request, Response } from 'express';
import { createCategoryService, deleteCategoryByIdService, getAllCategoriesService, getCategoryService, updateCategoryDataService } from '../services/category.service';

// Create a new category
export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        
        const category_record_result = await createCategoryService({ name, description });

        res.status(201).json(category_record_result);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get all categories
export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesService();
        console.log("Fetch all category successfully")
        res.status(201).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Get single category by ID
export const getCategoryByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idInt = parseInt(id)
        console.log("id int: ",idInt)
        const category = await getCategoryService(idInt)
        console.log("Fetch category by id is success")
        res.status(201).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update a category
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        
        await updateCategoryDataService(parseInt(id), name, description);
        
        res.status(201).json({message: "Successfully updated"});
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        await deleteCategoryByIdService(parseInt(id));
        
        res.status(204).json({message: "Successfully deleted"});
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' }); 
    }
};