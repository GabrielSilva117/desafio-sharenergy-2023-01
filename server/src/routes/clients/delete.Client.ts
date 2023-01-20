import { authorize } from './../../../config/auth'
import mongoose from 'mongoose'
import '../../model/Client'
const Client = mongoose.model('Client')
import express from 'express'

const router = express.Router()

router.delete('/client/:id', authorize, async (req, res) => {
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
  await Client.findOneAndDelete({ _id: clientId })
  return res.status(200).json({
    msg: 'Client deleted successfully!'
  })
})

export { router as DeleteClient }
