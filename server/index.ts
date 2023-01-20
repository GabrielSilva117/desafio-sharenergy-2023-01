import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { RegisterUser } from './src/routes/user/register'
import { LoginUser } from './src/routes/user/login'
import { CreateClient } from './src/routes/clients/createClient'
import { ReadClients } from './src/routes/clients/readClient'
import { DeleteClient } from './src/routes/clients/delete.Client'
import { UpdateClient } from './src/routes/clients/update.Client'

const app = express()
const port = process.env.PORT || 3001

app.use(
  bodyParser.json({
    limit: '5mb'
  })
)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const main = async () => {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/sharenergy-prod')
    console.log('Database connected')
    app.listen(port, () => {
      console.log('Server Running in ' + port)
    })

    app.use((req, res, next) => {
      res.set({
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      })
      next()
    })

    app.use([
      RegisterUser,
      LoginUser,
      CreateClient,
      ReadClients,
      DeleteClient,
      UpdateClient
    ])
  } catch (e) {
    console.error(e)
  }
}

main()
