
import { Request, Response } from 'express';
import { handleUserAuthService } from '../services/userauth.service';


export async function handleUserAuthController(req: Request, res: Response) {
    try {
        const user_register_details = req.body;
        const user_register_record_result = await handleUserAuthService(user_register_details)
        res.status(200).json({message: "Register Successfully!",user_register_record_result})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

