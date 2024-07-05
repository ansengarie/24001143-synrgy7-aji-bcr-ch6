import knex from 'knex'
import { config } from 'dotenv'

config()

const knexInstance = knex({
  client: process.env.DBNAME_BASE,
  connection: {
    host: process.env.DB_HOST_BASE,
    port: parseInt(process.env.DB_PORT_BASE ?? '6543'),
    database: process.env.DBNAME_BASE,
    user: process.env.DB_USER_BASE,
    password: process.env.DB_PASSWORD_BASE
  }
})

export default knexInstance
