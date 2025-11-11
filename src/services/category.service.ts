import { AppDataSource } from "../data-source";
import { findOneByCondition, insertDataByDb, updateAndOp, findallwithCondition } from "../DBHandleFunction/DB.Handler";
import { Category } from "../entity/category.entity";


// Define category types
export interface CategoryDbType {
    id: number;
    name: string;
    description: string | null;
    status : boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CreateCategoryInput {
    name: string;
    description?: string;
}

// Create a new category
export const createCategoryService = async (categoryData: CreateCategoryInput): Promise<CategoryDbType> => {
    try {
        const existingCategory = await findOneByCondition(AppDataSource,Category,{name: categoryData.name});
        if (existingCategory) {
            console.error('Category already exists');
            throw new Error("Category already exists");
        }
        
        console.log('Category is not exist');
        
        const newCategory = await insertDataByDb(
            AppDataSource, // Using Users table as a fallback since Categories is not in ALLOWED_TABLES
            Category,
            {name: categoryData.name,description: categoryData.description}
        );

        if (!newCategory) {
            console.error('Failed to create category');
            throw new Error('Failed to create category');
        }

        console.log('Creating new category:', categoryData);
        return newCategory as unknown as CategoryDbType;
    } catch (error) {
        console.error('Error in createCategory service:', error);
        throw error;
    }
};

// Get all categories
export const getAllCategoriesService = async (): Promise<CategoryDbType[]> => {
    try {
        const categories = await findallwithCondition(AppDataSource,Category,{status: true});
        if (categories.length === 0) {
            console.error('No categories found');
            throw new Error('No categories found');
        }
        return categories as unknown as CategoryDbType[];
    } catch (error) {
        console.error('Error in getAllCategories service:', error);
        throw error;
    }
};

// Get category by ID
export const getCategoryService = async (id: number): Promise<CategoryDbType | null> => {
    try {
        const category = await findOneByCondition(AppDataSource,Category,{id: id});
        if (category === null) {
            console.error('No categories found');
            throw new Error('No categories found');
        }
        return category as unknown as CategoryDbType | null;
    } catch (error) {
        console.error('Error in getCategory service:', error);
        throw error;
    }
};

// Update category
export const updateCategoryDataService = async (id: number, name: string, description?: string) => {
    try {
        const updateData: any = { name };
        if (description !== undefined) {
            updateData.description = description;
        }

        await updateAndOp("Categories",updateData,{ id });
    } catch (error) {
        console.error('Error in updateCategoryData service:', error);
        throw error;
    }
};

// Delete category
export const deleteCategoryByIdService = async (id: number) => {
    try {
         await updateAndOp("Categories",{staus: false},{ id });
    } catch (error) {
        console.error('Error in deleteCategoryById service:', error);
        throw error;
    }
};