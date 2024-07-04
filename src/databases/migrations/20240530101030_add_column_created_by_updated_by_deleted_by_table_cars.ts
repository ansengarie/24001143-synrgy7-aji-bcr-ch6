import { type Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cars', (table: Knex.TableBuilder) => {
    table.foreign('created_by').references('id').inTable('users')
    table.foreign('updated_by').references('id').inTable('users')
    table.foreign('deleted_by').references('id').inTable('users')
    table.timestamp('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cars', (table: Knex.TableBuilder) => {
    table.dropForeign('created_by')
    table.dropForeign('updated_by')
    table.dropForeign('deleted_by')
    table.dropColumn('deleted_at')
  })
}
