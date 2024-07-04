import express, { Express } from 'express'
import cors from 'cors';  // Import CORS
import { Model } from 'objection'
import { config } from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swaggerConfig'

import knexInstance from './databases'
import { route } from './routes/route'

config()

Model.knex(knexInstance)

class App {
  public app: Express = express()
  constructor() {
    this.app.use(cors())
    this.app.use(morgan('combined'))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    this.app.use('/api/v1', route)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    this.app.get('/', (req, res) => {
      res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Welcome to API',
        data: null
      })
    })

    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        status: 'error',
        message: 'Route not found',
        data: null
      })
    })
  }
}

export default new App().app
