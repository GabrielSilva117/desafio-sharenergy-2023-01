import { authorize } from './../../../config/auth'
import mongoose from 'mongoose'
import '../../model/Client'
const Client = mongoose.model('Client')
import express from 'express'

const router = express.Router()

router.put('/client/:id', authorize, async (req, res) => {
  const { first_name, last_name, email, telefone, address, cpf } = req.body
  const clientId = req.params.id
  if (!clientId) {
    return res.status(403).json({
      msg: 'You must pass a client id! Try again.'
    })
  }

  const client = await Client.findOne({ _id: clientId })
  if (!client) {
    return res.status(404).json({
      msg: 'Invalid Id! You must pass a valid client id, try again. '
    })
  }

  if (!first_name || !last_name || !email || !telefone || !address || !cpf) {
    return res.status(403).json({
      msg: 'You must fill all the required information.'
    })
  }

  if (
    first_name.length <= 2 ||
    last_name <= 3 ||
    first_name.length > 20 ||
    last_name.length > 30
  ) {
    return res.status(403).json({
      msg: 'The first/last name length is either too short or too big, try again using a valid name.'
    })
  }

  if (email !== client.email) {
    const validEmail = await Client.findOne({ email })
    if (validEmail) {
      return res.status(403).json({
        msg: 'This email already exists! Try again.'
      })
    }
  }

  if (telefone !== client.telefone) {
    const validTel = await Client.findOne({ telefone })
    if (validTel) {
      return res.status(403).json({
        msg: 'This telefone number has already been taken! Try again.'
      })
    }
  }

  if (cpf !== client.cpf) {
    const validCpf = await Client.findOne({ cpf })
    if (validCpf) {
      return res.status(403).json({
        msg: 'This Cpf has already been registered to another client! Try again.'
      })
    }
  }

  await Client.findOneAndUpdate(
    { _id: clientId },
    { first_name, last_name, email, telefone, address, cpf }
  )
  return res.status(201).json({
    msg: 'Client updated with success!'
  })
})

export { router as UpdateClient }
