import { authorize } from './../../../config/auth'
import mongoose from 'mongoose'
require('../../model/User')
const User = mongoose.model('User')
require('../../model/Client')
const Client = mongoose.model('Client')
import express from 'express'
import jwt from 'jwt-decode'

const router = express.Router()

router.get('/client', authorize, async (req, res) => {
  const token = req.headers['authorization'] || ''
  const bearer = token.split(' ')[1]

  const decoded: { username: string; iat: number; exp: number } = jwt(bearer)
  const userInfo = await User.findOne({ username: decoded.username })
  const user = userInfo._id
  const clients = await Client.find({ user })
  if (clients.length == 0) {
    return res.status(200).json({
      msg: 'You have no clients'
    })
  }
  return res.status(200).json(clients)
})

export { router as ReadClients }
