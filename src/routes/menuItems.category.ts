import { Router } from "express";
import { createMenuItemsCategoryController } from "../controllers/menu_items.category.controller";
import { allowApiAccessRole, authorizationToken } from "../utils/jwt.auth";

const menuItemsCategoryRouter = Router()

menuItemsCategoryRouter.post("/v1/api/menuItems/category/create",authorizationToken,allowApiAccessRole(["admin"]),createMenuItemsCategoryController)

export default menuItemsCategoryRouter
