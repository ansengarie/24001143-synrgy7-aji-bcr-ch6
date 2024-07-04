import { type Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.string('id', 255).primary()
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable()
    table.string('password', 255).notNullable()
    table.string('token', 255)
    table.string('role', 255).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
