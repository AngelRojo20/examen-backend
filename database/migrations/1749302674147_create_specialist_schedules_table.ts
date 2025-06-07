import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SpecialistSchedules extends BaseSchema {
  protected tableName = 'specialist_schedules'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('specialist_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('specialists')
        .onDelete('CASCADE')

      table
        .enum('dia', ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
        .notNullable()

      table.time('hora_inicio').notNullable()
      table.time('hora_fin').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
