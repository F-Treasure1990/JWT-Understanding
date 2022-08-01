import { Request, Response, NextFunction } from "express"
import { getSession } from "../src/db"
import { signJWT, verifyJWT } from "../src/utils/jwt.utils"

export function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies

  if (!accessToken) {
    return next()
  }

  const { payload, expired } = verifyJWT(accessToken)
  //for vald access token
  if (payload) {
    //@ts-ignore
    req.user = payload
  }
  // exspired but valid access token
  const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken) : { payload: null }

  if (!refresh) {
    return next()
  }
  //@ts-ignore
  const session = getSession(refresh.sessionId);

  if (!session) {
    return next()
  }

  const newAccessToken = signJWT(session, '5s')

  res.cookie("accessToken", newAccessToken, {
    maxAge: 30000,
    httpOnly: true
  })

  //@ts-ignore
  req.user = verifyJWT(newAccessToken).payload

  return next()

}
