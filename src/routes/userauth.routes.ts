import { Router } from "express";
import { handleUserAuthController } from "../controllers/userauth.controller";

const userRoutes = Router()


userRoutes.post('/v1/api/register',handleUserAuthController)

export default userRoutes