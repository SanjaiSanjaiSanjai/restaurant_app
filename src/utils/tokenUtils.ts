import { findOneByCondition } from "../DBHandleFunction/DB.Handler";
import { reCreatearefreshToken, tokenDecode } from "./jwt.auth";

export async function reGeneratedToken(token: string) {
    const decodeToken = await tokenDecode(token)

    const getUserTokenRecord = await findOneByCondition('RefreshToken','userId',decodeToken.userId)
    if(!getUserTokenRecord) throw new Error("Not Found UserId and Token")

    const getNewRefreshToken = await reCreatearefreshToken(getUserTokenRecord.token)
    if(getNewRefreshToken) throw new Error('Your token is nearing expire date please login then continue')
}