import { Router } from 'express';
import { 
    createCategoryController, 
    getAllCategoriesController, 
    getCategoryByIdController, 
    updateCategoryController, 
    deleteCategoryController 
} from '../controllers/category.controller';
import { allowApiAccessRole, authorizationToken } from '../utils/jwt.auth';

const categoryRouter = Router();

// Create a new category
categoryRouter.post('/v1/api/category/create', authorizationToken,allowApiAccessRole(['admin']),createCategoryController);

// Get all categories
categoryRouter.get('/v1/api/category/getAll', authorizationToken,allowApiAccessRole(['admin','User','staff']),getAllCategoriesController);

// Get single category by ID
categoryRouter.get('/v1/api/category/get/:id',authorizationToken,allowApiAccessRole(['admin','User','staff']),getCategoryByIdController);

// Update a category
categoryRouter.put('/v1/api/category/update/:id', authorizationToken,allowApiAccessRole(['admin']),updateCategoryController);

// Delete a category (soft delete)
categoryRouter.delete('/v1/api/category/delete/:id', authorizationToken,allowApiAccessRole(['admin']),deleteCategoryController);

export default categoryRouter;