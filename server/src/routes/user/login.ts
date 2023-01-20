import { generateAccessToken } from './../../../config/auth'
import mongoose from 'mongoose'
require('../../model/User')
const User = mongoose.model('User')
import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(403).json({
      msg: 'You must fill the required information!'
    })
  }

  const user = await User.findOne({ username })

  if (user == null) {
    return res.status(404).json({
      msg: 'Invalid username! You must provide a valid username to login.'
    })
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (!result) {
      return res.status(403).json({
        msg: 'Invalid password! Try again.'
      })
    }
    const token = await generateAccessToken({ username })
    return res.status(201).json({
      token: token
    })
  })
  return
})

export { router as LoginUser }
