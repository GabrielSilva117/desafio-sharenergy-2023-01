import mongoose, { Schema } from 'mongoose'

const clientSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 30
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 40
  },
  telefone: {
    type: String,
    required: true,
    unique: true,
    maxLength: 14
  },
  address: {
    type: String,
    required: true,
    maxLength: 60
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    maxLength: 11
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Client', clientSchema)
