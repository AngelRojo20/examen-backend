import Specialist from '#models/specialist'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class SpecialistSeeder extends BaseSeeder {
  public async run() {
    await Specialist.createMany([
      {
        nombreCompleto: 'Dra. Ana Martínez',
        especialidad: 'Pediatría',
        registroProfesional: 'MED001',
        activo: true,
      },
      {
        nombreCompleto: 'Dr. Carlos Pérez',
        especialidad: 'Cardiología',
        registroProfesional: 'MED002',
        activo: true,
      },
    ])
  }
}
