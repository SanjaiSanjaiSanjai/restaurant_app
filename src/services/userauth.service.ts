import { AppDataSource } from "../data-source";
import { findOneByCondition, insertDataByDb, updateAndOp } from "../DBHandleFunction/DB.Handler";
import { RefreshToken } from "../entity/refreshToken.entity";
import { Users } from "../entity/User.entity";
import { ReadonlyLoginUserType, UserRegister } from "../types/types";
import { hashPasswordGenarate, passwordComparation } from "../utils/bcrypt.password";
import { accessTokenGenerated, findExpireTime, refreshTokenGenerated } from "../utils/jwt.auth";
import { roleIdentifier } from "../utils/user.rolefind";

export async function handleUserRegisterAuthService(userDetails: UserRegister): Promise<{ payload: any, refresh_token: string, access_token: string, tokenPayload: any }> {
    const isAvailableUser = await findOneByCondition(AppDataSource,Users,{email: userDetails.email})
    if (isAvailableUser) throw new Error(' Already user is available! ')

    const hashPassword = await hashPasswordGenarate(userDetails.password)
    if (hashPassword.length == 0) throw new Error(' Hashpassword is not creayed ')

    const ClientRole = roleIdentifier(userDetails.email)
    if (ClientRole.length == 0) throw new Error(' Not Create Role ')

    const getNewUserRecord = await insertDataByDb(AppDataSource,Users,{name:userDetails.name,email: userDetails.email,password:userDetails.password})
    if (!getNewUserRecord) throw new Error(' User data is not inserted ')

    const newRefreshToken: string = await refreshTokenGenerated(getNewUserRecord.id, getNewUserRecord.email)
    if (!newRefreshToken) throw new Error('Refresh Token is not generated')

    const newAccessToken: string = await accessTokenGenerated(getNewUserRecord.id, getNewUserRecord.email, ClientRole)
    if (!newAccessToken) throw new Error('access Token is not generated')

    const tokenExpiretime = await findExpireTime(newRefreshToken)
    const refreshTokenStoredDb = await insertDataByDb(AppDataSource,RefreshToken,{token:newRefreshToken,userId: getNewUserRecord,expired_at: tokenExpiretime})
    return {
        payload: getNewUserRecord,
        refresh_token: newRefreshToken,
        access_token: newAccessToken,
        tokenPayload: refreshTokenStoredDb
    }
}






export async function handleUserLoginAuthService(loginUserDetails: ReadonlyLoginUserType): Promise<{refresh_token: string,access_token: string}> {
    const fetchSingleUser = await findOneByCondition(AppDataSource,Users,{email: loginUserDetails.email})
    if (!fetchSingleUser) throw new Error("Not Found User Details register first")

    if (!passwordComparation(fetchSingleUser.password, loginUserDetails.password)) {
        throw new Error("password is wrong")
    }

    const refresh_token = await refreshTokenGenerated(fetchSingleUser.id, loginUserDetails.email)
    if (refresh_token.length == 0) throw new Error("Not created refresh token")

    const role = roleIdentifier(loginUserDetails.email)

    const access_token = await accessTokenGenerated(fetchSingleUser.id, loginUserDetails.email, role)
    if (access_token.length == 0) throw new Error("Not created access token")

    await updateAndOp("RefreshToken", { token: refresh_token, refreshCount: 0 }, { userId: fetchSingleUser.id })

    return {
        refresh_token: refresh_token,
        access_token: access_token,
    }
}