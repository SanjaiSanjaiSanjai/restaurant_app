import { Router } from "express";
import { handleUserRegisterAuthController , handleUserLoginAuthController} from "../controllers/userauth.controller";

const userRoutes = Router()


userRoutes.post('/v1/api/register',handleUserRegisterAuthController)
userRoutes.post('/v1/api/login',handleUserLoginAuthController)

export default userRoutes