import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv";
import { Users } from "./entity/User.entity";
import { RefreshToken } from "./entity/refreshToken.entity";
dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Users,RefreshToken],
    synchronize: true,
    logging: false
})

export async function ConfigurationDB() {
    try {
        await AppDataSource.initialize()
        console.log("[data-source]: Successfully connected in db")
    } catch (error) {
        const err = error as Error 
        console.error("[data-source]: ",err.message)
    }
}