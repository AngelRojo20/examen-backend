import SpecialistSchedule from '#models/specialist_schedule'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class SpecialistScheduleSeeder extends BaseSeeder {
  public async run() {
    await SpecialistSchedule.createMany([
      {
        specialistId: 1,
        dia: 'Lunes',
        horaInicio: '08:00',
        horaFin: '12:00',
      },
      {
        specialistId: 1,
        dia: 'Miércoles',
        horaInicio: '14:00',
        horaFin: '18:00',
      },
      {
        specialistId: 2,
        dia: 'Martes',
        horaInicio: '10:00',
        horaFin: '13:00',
      },
    ])
  }
}
