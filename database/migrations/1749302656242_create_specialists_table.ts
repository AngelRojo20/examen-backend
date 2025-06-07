import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Specialists extends BaseSchema {
  protected tableName = 'specialists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre_completo').notNullable()
      table.string('especialidad').notNullable()
      table.string('registro_profesional').notNullable().unique()
      table.boolean('activo').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
