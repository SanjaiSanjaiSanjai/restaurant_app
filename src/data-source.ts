import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv";
dotenv.config()

import { Users } from "./entity/User.entity";
import { RefreshToken } from "./entity/refreshToken.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Users, RefreshToken],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true
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