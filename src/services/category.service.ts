import { findOneByCondition, insertDataByDb, updateAndOp, findallwithCondition } from "../DBHandleFunction/DB.Handler";


// Define category types
export interface Category {
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
export const createCategoryService = async (categoryData: CreateCategoryInput): Promise<Category> => {
    try {
        const existingCategory = await findOneByCondition("Categories", "name", categoryData.name);
        if (existingCategory) {
            console.error('Category already exists');
            throw new Error("Category already exists");
        }
        
        console.log('Category is not exist');
        
        const newCategory = await insertDataByDb(
            'Categories', // Using Users table as a fallback since Categories is not in ALLOWED_TABLES
            ['name', 'description'],
            [categoryData.name, categoryData.description || null]
        );

        if (!newCategory) {
            console.error('Failed to create category');
            throw new Error('Failed to create category');
        }

        console.log('Creating new category:', categoryData);
        return newCategory as unknown as Category;
    } catch (error) {
        console.error('Error in createCategory service:', error);
        throw error;
    }
};

// Get all categories
export const getAllCategoriesService = async (): Promise<Category[]> => {
    try {
        const categories = await findallwithCondition('Categories', [{column: "status",value: true}]);
        if (categories.length === 0) {
            console.error('No categories found');
            throw new Error('No categories found');
        }
        return categories as unknown as Category[];
    } catch (error) {
        console.error('Error in getAllCategories service:', error);
        throw error;
    }
};

// Get category by ID
export const getCategoryService = async (id: number): Promise<Category | null> => {
    try {
        const category = await findOneByCondition("Categories", "id", id);
        if (category.length === 0) {
            console.error('No categories found');
            throw new Error('No categories found');
        }
        return category as unknown as Category | null;
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