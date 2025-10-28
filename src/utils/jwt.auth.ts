import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Request,Response,NextFunction} from "express";
import { reGeneratedToken } from "./tokenUtils";
dotenv.config()

const REFRESH_SECRET_KEY = process.env.SECRET_REFRESH_KEY || 'super.refresh.secret'
const ACCESS_SECRET_KEY = process.env.SECRET_ACCESS_KEY || 'super.access.secret'


/**
 * Generates a refresh token for a user
 * @param userId - The id of the user
 * @param email - The email of the user
 * @returns A promise that resolves to a refresh token string
 */
export async function refreshTokenGenerated(userId: number, email: string): Promise<string> {
    return await jwt.sign({userId: userId, email: email,type: 'refresh-token'}, REFRESH_SECRET_KEY, {expiresIn: '10m'}) // The token expires in 7 days);
}

/**
 * Generates a access token for a user
 * @param userId -The id of the user
 * @param email -The email of the user
 * @param role  - The role of the user
 * @returns A promise that resolves to a access token string
 */
export async function accessTokenGenerated(userId: number,email: string,role: string): Promise<string> {
    return await jwt.sign({userId:userId,email: email,role: role,type: 'access-token'},ACCESS_SECRET_KEY,{expiresIn: '5m'})
}



interface TokenPayload extends jwt.JwtPayload {
    userId: number;
    email: string;
    type: 'access-token' | 'refresh-token';
    role?: string;
}

/**
 * Extracts and verifies the authorization token from the request headers
 * @param req - Express request object
 * @returns Decoded token payload if verification is successful
 * @throws {Error} If authorization header is missing, malformed, or token is invalid
 */
export async function authorizationToken(req: Request,next: NextFunction) {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        throw new Error("Authorization header is missing");
    }

    // Handle both "Bearer token" and "token" formats
    const tokenParts = authHeader.split(" ");
    const token = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];
    
    if (!token) {
        throw new Error("No token provided");
    }
    
    const isVerified = await verifyToken(token);
    if (isVerified) {
        next()
    }
}

/**
 * Verifies a JWT token and returns its payload
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws {Error} If token is invalid, expired, or verification fails
 */
export async function verifyToken(token: string): Promise<TokenPayload> {
    try {
        // Initial decode to check token type
        const decoded = jwt.decode(token, { json: true }) as TokenPayload | null;
        
        if (!decoded || typeof decoded !== "object" || !('type' in decoded)) {
            throw new Error("Invalid token format");
        }

        // Determine the appropriate secret key based on token type
        const secretKey = decoded.type === 'refresh-token' ? REFRESH_SECRET_KEY : decoded.type === 'access-token' ? ACCESS_SECRET_KEY : null;

        if (!secretKey) {
            throw new Error("Invalid token type");
        }

        // Verify the token with the appropriate secret key
        const verified = jwt.verify(token, secretKey) as TokenPayload;
        return verified;
        
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            await reGeneratedToken(token)
            
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token");
        }
        throw error;
    }
}


/**
 * This function re-creates a refresh token if the token is not expired.
 * It takes a JWT token as input and decodes it to check the expiration time.
 * If the token is not expired, it uses the userId and email from the decoded token
 * to generate a new refresh token. It then returns an object with the new refresh token
 * and a boolean indicating whether the token is still valid. If the token is expired,
 * it returns an empty refresh token and a boolean indicating that the token is no longer valid.
 *
 * @param token - The JWT token to re-create the refresh token for.
 * @return An object with the new refresh token and a boolean indicating its validity.
 */
export const reCreatearefreshToken = async (token: string): Promise<boolean> => {
    
    // Calculate the current time and 5 minutes ago
    const tokenExpireTime = (await findExpireTime(token)).getTime()
    const currentTime = new Date().getTime()
    const fiveMinutesAgo = 5 * 60 * 1000

    if (currentTime >= tokenExpireTime && (fiveMinutesAgo - tokenExpireTime)) {
        return true
    }
    return  false
};


/**
 * Decodes a JWT token and returns the decoded payload.
 * 
 * This function takes a JWT token as input and decodes it using the `jsonwebtoken` library.
 * It returns a Promise that resolves to the decoded payload of the token.
 *
 * @param token - The JWT token to decode.
 * @returns A Promise that resolves to the decoded payload of the token.
 */
export const tokenDecode = async (token: string) : Promise<TokenPayload> =>{
    // Decode the token using the `jsonwebtoken` library
    const decode = jwt.decode(token,{json: true}) as TokenPayload
    
    // Return the decoded payload
    return decode
};


export const findExpireTime = async(token: string): Promise<Date>=> {
    // Decode the token to get the expiration time
    const decode = await tokenDecode(token)
    const expTime = decode?.iat;
    // Calculate the expiration time of the token
    const tokenExpireTime = new Date(expTime as number);
    return tokenExpireTime
}