import { Router } from "express";
import { createMenuItemsController, getAllMenuItemsController} from "../controllers/menuItems.controller";
import { allowApiAccessRole, authorizationToken } from "../utils/jwt.auth";

const menuItemsRouter = Router();

// Create a new menu item
menuItemsRouter.post('/v1/api/menu/create', authorizationToken, allowApiAccessRole(['admin']), createMenuItemsController);

// Get all menu items
menuItemsRouter.get('/v1/api/menu/getAll', authorizationToken, allowApiAccessRole(['admin', 'User', 'staff']), getAllMenuItemsController);

export default menuItemsRouter;
