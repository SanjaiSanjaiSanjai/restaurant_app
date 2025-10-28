import { Users } from "../entity/User.entity";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/refreshToken.entity";


/**
 * Repository for Users table in database 
 * @type {Repository<Users>}
 */

export const user_repo = AppDataSource.getRepository(Users)         
export const refresh_token_repo = AppDataSource.getRepository(RefreshToken)         