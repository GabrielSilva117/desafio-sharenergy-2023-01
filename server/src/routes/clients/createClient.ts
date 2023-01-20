import mongoose from 'mongoose'
require('../../model/Client')
const Client = mongoose.model('Client')
require('../../model/User')
const User = mongoose.model('User')
import express from 'express'
import { authorize } from '../../../config/auth'
import jwt from 'jwt-decode'

const router = express.Router()

router.post('/client', authorize, async (req, res) => {
  const { first_name, last_name, email, telefone, address, cpf } = req.body
  const token: string = req.headers['authorization'] || ''

  if (!first_name || !last_name || !email || !telefone || !address || !cpf) {
    return res.status(403).json({
      msg: 'You must fill all the required information.'
    })
  }

  if (first_name.length <= 2 || last_name <= 3) {
    return res.status(403).json({
      msg: 'The first/last name is too short, try again using a valid name.'
    })
  }

  const validEmail = await Client.findOne({ email })
  if (validEmail) {
    return res.status(403).json({
      msg: 'This email already exists! Try again.'
    })
  }

  const validTel = await Client.findOne({ telefone })
  if (validTel) {
    return res.status(403).json({
      msg: 'This telefone number has already been taken! Try again.'
    })
  }

  const validCpf = await Client.findOne({ cpf })
  if (validCpf) {
    return res.status(403).json({
      msg: 'This Cpf has already been registered to another client! Try again.'
    })
  }

  const bearer = token.split(' ')[1]
  const decoded: { username: string; iat: number; exp: number } = jwt(bearer)

  const user = await User.findOne({ username: decoded.username })

  const client = await Client.create({
    first_name,
    last_name,
    email,
    telefone,
    address,
    cpf,
    user: user._id
  })

  return res.status(201).json({
    msg: 'Client created successfully!'
  })
})

export { router as CreateClient }
