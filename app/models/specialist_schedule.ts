import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Specialist from './specialist.js'

export default class SpecialistSchedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public specialistId: number

  @column()
  public dia: string  // Ej: 'Lunes', 'Martes'...

  @column()
  public horaInicio: string // HH:mm:ss

  @column()
  public horaFin: string // HH:mm:ss

  @belongsTo(() => Specialist)
  public especialista: BelongsTo<typeof Specialist>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
