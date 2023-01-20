import mongoose from 'mongoose'
require('../../model/User')
const User = mongoose.model('User')
import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(403).json({
      msg: 'You must provide a valid username and password'
    })
  }

  const usernameTest = await User.findOne({ username })
  if (username === usernameTest.username) {
    return res.status(403).json({
      msg: 'Username already in use! Try again using another name.'
    })
  }

  const user = await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.sendStatus(403).json({ err })
      }
      const hashedPword = hash
      await User.create({
        username,
        password: hashedPword
      })
      return res.status(201).json({
        msg: `The user ${username} was created successfully!`
      })
    })
  })
  return user
})

export { router as RegisterUser }
