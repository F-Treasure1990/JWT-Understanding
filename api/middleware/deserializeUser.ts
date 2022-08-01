import { Request, Response, NextFunction } from "express"
import { getSession } from "../src/db"
import { signJWT, verifyJWT } from "../src/utils/jwt.utils"

export function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  // For a valid access token
  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  // expired but valid access token

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const session = getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, "5s");

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  // @ts-ignore
  req.user = verifyJWT(newAccessToken).payload;

  return next();
}
