import type { Knex } from 'knex'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const config: Record<string, Knex.Config> = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST_BASE,
      port: parseInt(process.env.DB_PORT_BASE ?? '6543'),
      database: process.env.DBNAME_BASE,
      user: process.env.DB_USER_BASE,
      password: process.env.DB_PASSWORD_BASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './databases/migrations'
    },
    seeds: {
      directory: './databases/seeds'
    }
  }
}

module.exports = config
