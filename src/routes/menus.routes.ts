import { Router } from "express";
import { allowApiAccessRole, authorizationToken } from "../utils/jwt.auth";
import { menuCreateController, menuGetAllController } from "../controllers/menu.controller";

const menusRouter = Router()

menusRouter.post("/v1/api/menus/create",authorizationToken,allowApiAccessRole(["admin"]),menuCreateController)
menusRouter.get("/v1/api/menus/getAll",authorizationToken,allowApiAccessRole(["admin","User","staff"]),menuGetAllController)


export default menusRouter
