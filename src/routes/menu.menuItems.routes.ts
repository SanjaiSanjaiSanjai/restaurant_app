import { Router } from "express";
import { allowApiAccessRole, authorizationToken } from "../utils/jwt.auth";
import { createMenuMenuItemsController, getAllMenuItemsByMenuController } from "../controllers/menu.menuItems.controller";

const menuMenuItemsRouter = Router()

menuMenuItemsRouter.post("/v1/api/menuMenuItems/create",authorizationToken,allowApiAccessRole(["admin"]),createMenuMenuItemsController)

menuMenuItemsRouter.get("/v1/api/menuMenuItems/getAll/:id",authorizationToken,allowApiAccessRole(["admin","user","staff"]),getAllMenuItemsByMenuController)

export default menuMenuItemsRouter