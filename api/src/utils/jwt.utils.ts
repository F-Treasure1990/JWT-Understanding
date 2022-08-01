import jwt from 'jsonwebtoken'

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCqky1WqhJvQlahiMwhke6u+JuPXoBD9h1Woe1wZfBa8mWAdfaD
3GP8601BQuv1HuuD3JSAtx3LbV46O/BPYBXif1JtAq9EbTBrM2zT6RGXduF6kdEn
qiKsFUu75PlZ9FyIENEv0EBMiQbWwP3DeeNxcHKGyGH6tC50uIAPCyoSYwIDAQAB
AoGBAJfnJ5olLPON9U43X+qJZjDFzurXcoyTUb9DxwqwjWLAuOm0o4r8KsMi3RLA
QRdyqLQuLMWPzWXLCP39QN2/KNyt8I/Mn2Wf31ZXV0nj+oHAaB+VlSKV1lbtw+NX
iiZy0oSrX0otEZ56bRenuajYMV3uLGhFqGm4TtsV73NdYozxAkEA4LFk9V9NIoqz
h5xToO5utZmOre+tH0rnvfS46m/YAl3au/ogamc3BtDInd9Zjf4PmQduQ963XwUE
w2EKX7w+ywJBAMJXcEZok5+89bIG8p6OJunCNnES7Nd8Vs80yxclpxEn0Zx+2lJR
Bq6/X6dbWKcxHKCFlTrS173IRzWVuXZQr8kCQDFfqcClZWy+r76P4myNmDQ9fvXH
ofIrYosCOJQDaaLzfropt2/KKHRN8peGWcZy2niVAmzVhtPRZX+NVls9IUsCQA7c
Bq6rglYdaZ/iHhz3e4w2GFmO++MCE9UmET1E2MBcDg/sNx9CKMOlyFeQiXfHLowr
ipyD0JEnRiKXvyWHx9kCQHwdO/GZG9KhU4fXUrTLE2KaVNt8qh7QjBu8njerjm5f
awRUHBcqInj0H/TEZGAa+gBoYI/A7OpOqXqIJMiWkoI=
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqky1WqhJvQlahiMwhke6u+JuP
XoBD9h1Woe1wZfBa8mWAdfaD3GP8601BQuv1HuuD3JSAtx3LbV46O/BPYBXif1Jt
Aq9EbTBrM2zT6RGXduF6kdEnqiKsFUu75PlZ9FyIENEv0EBMiQbWwP3DeeNxcHKG
yGH6tC50uIAPCyoSYwIDAQAB
-----END PUBLIC KEY-----`

//sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn })
}
//verify jwt
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey)
    return { payload: decoded, expired: false }
  } catch (error: any) {
    return { payload: null, expired: error.message.include("jwt expired") }
  }
}
