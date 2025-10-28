import { findOneByCondition, insertDataByDb } from "../DBHandleFunction/DB.Handler";
import { UserRegister } from "../types/types";
import { hashPasswordGenarate } from "../utils/bcrypt.password";
import { accessTokenGenerated, findExpireTime, refreshTokenGenerated } from "../utils/jwt.auth";
import { roleIdentifier } from "../utils/user.rolefind";

export async function handleUserAuthService(userDetails: UserRegister): Promise<{payload: any,refresh_token: string,access_token: string,tokenPayload: any}>{
    const isAvailableUser = await findOneByCondition("Users","email",userDetails.email)
    if(isAvailableUser) throw new Error(' Already user is available! ')

    const hashPassword = await hashPasswordGenarate(userDetails.password)
    if (hashPassword.length == 0) throw new Error(' Hashpassword is not creayed ')

    const ClientRole = roleIdentifier(userDetails.email)
    if (ClientRole.length == 0) throw new Error(' Not Create Role ')

    const getNewUserRecord = await insertDataByDb('Users',['name','email','password'],[userDetails.name,userDetails.email,hashPassword])
    if (!getNewUserRecord) throw new Error(' User data is not inserted ')

    const newRefreshToken: string = await refreshTokenGenerated(getNewUserRecord.id,getNewUserRecord.email)
    if(!newRefreshToken) throw new Error('Refresh Token is not generated')

    const newAccessToken: string = await accessTokenGenerated(getNewUserRecord.id,getNewUserRecord.email,ClientRole)
    if(!newAccessToken) throw new Error('access Token is not generated')

    const tokenExpiretime = await findExpireTime(newRefreshToken)
    const refreshTokenStoredDb = await insertDataByDb('RefreshToken',['userId','token','expired_at'],[getNewUserRecord.id,newRefreshToken,tokenExpiretime])
    return {
        payload: getNewUserRecord,
        refresh_token: newRefreshToken,
        access_token: newAccessToken,
        tokenPayload: refreshTokenStoredDb
    }
}