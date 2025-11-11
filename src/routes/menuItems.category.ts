import { Router } from "express";
import { createMenuItemsCategoryController, getAllByIdMenuItemsCategoryController } from "../controllers/menu_items.category.controller";
import { allowApiAccessRole, authorizationToken } from "../utils/jwt.auth";

const menuItemsCategoryRouter = Router()

menuItemsCategoryRouter.post("/v1/api/menuItems/category/create",authorizationToken,allowApiAccessRole(["admin"]),createMenuItemsCategoryController)

menuItemsCategoryRouter.get("/v1/api/menuItems/category/:id",authorizationToken,allowApiAccessRole(["admin","user","staff"]),getAllByIdMenuItemsCategoryController)

export default menuItemsCategoryRouter
