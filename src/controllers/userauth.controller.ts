
import { Request, Response } from 'express';
import { handleUserLoginAuthService, handleUserRegisterAuthService } from '../services/userauth.service';
import { ReadonlyLoginUserType } from '../types/types.js';


export async function handleUserRegisterAuthController(req: Request, res: Response) {
    try {
        const user_register_details = req.body;
        const user_register_record_result = await handleUserRegisterAuthService(user_register_details)
        res.status(200).json({message: "Register Successfully!",user_register_record_result})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}





export async function handleUserLoginAuthController(req: Request, res: Response) {
    try {
        const user_login_details: ReadonlyLoginUserType= req.body;
        const user_login_record_result = await handleUserLoginAuthService(user_login_details)
        res.status(200).json({message: "Login Successfully!",user_login_record_result})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}