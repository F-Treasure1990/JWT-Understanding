import { Request, Response } from 'express'
import { createSession, getUser } from '../db'
import { signJWT, verifyJWT } from '../utils/jwt.utils'
// login handler
export function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body
  const user = getUser(email)

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid Credentials')
  }

  const session = createSession(email, user.name)

  //create access token 
  const accessToken = signJWT({ email: user.email, name: user.name }, "5m")
  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y")
  //set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5mins
    httpOnly: true
  })
  //set refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1yr
    httpOnly: true
  })

  // send user back
  return res.send(session)
}
// get the session
export function getSessionHander(req: Request, res: Response) {
  //@ts-ignore
  return res.send(req.user)
}
// log out handler
export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("tutorialToken", "", {
    maxAge: 0,
    httpOnly: true
  })

  res.send({ success: true })
}
