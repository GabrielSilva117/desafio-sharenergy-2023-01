import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const accessToken: string = process.env.ACCESS_TOKEN_SECRET || ''

export const generateAccessToken = async (data: object) => {
  return jwt.sign(data, accessToken, { expiresIn: '2h' })
}

export const authorize = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.sendStatus(403)
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, accessToken, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).json({
        msg: 'Invalid or expired token! Try again.'
      })
    }
    req.decoded = decoded
    next()
  })
}
