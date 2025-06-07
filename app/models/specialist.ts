import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SpecialistSchedule from './specialist_schedule.js'

export default class Specialist extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public nombreCompleto: string

  @column()
  public especialidad: string

  @column()
  public registroProfesional: string

  @column({
    consume: (value) => Boolean(value), // para cuando se guarda desde el frontend
    serialize: (value: number) => Boolean(value), // para cuando se devuelve en la respuesta
  })
  public activo: boolean

  @hasMany(() => SpecialistSchedule)
  public horarios: HasMany<typeof SpecialistSchedule>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
