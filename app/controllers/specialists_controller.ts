import type { HttpContext } from '@adonisjs/core/http'
import Specialist from '#models/specialist'
import SpecialistSchedule from '#models/specialist_schedule'
import { specialistValidator } from '#validators/specialist'

// Utilidad para validar traslapes
function validarTraslapes(horarios) {
  const porDia = {}

  for (const h of horarios) {
    if (!porDia[h.dia]) porDia[h.dia] = []
    porDia[h.dia].push(h)
  }

  for (const dia in porDia) {
    const rangos = porDia[dia].sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
    for (let i = 1; i < rangos.length; i++) {
      if (rangos[i].hora_inicio < rangos[i - 1].hora_fin) {
        throw new Error(`Traslape en ${dia}: ${rangos[i - 1].hora_inicio}-${rangos[i - 1].hora_fin} y ${rangos[i].hora_inicio}-${rangos[i].hora_fin}`)
      }
    }
  }
}

export default class SpecialistsController {
  // Listar especialistas activos
  async index({ response }: HttpContext) {
    const especialistas = await Specialist.query()
      .where('activo', true)
      .preload('horarios')
    return response.ok(especialistas)
  }

  // Listar inactivos
  async inactivos({ response }: HttpContext) {
    const especialistas = await Specialist.query()
      .where('activo', false)
      .preload('horarios')
    return response.ok(especialistas)
  }

  // Crear nuevo especialista
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(specialistValidator)
    const horarios = request.input('horarios')

    const existente = await Specialist.findBy('registroProfesional', payload.registro_profesional)
    if (existente) {
      return response.badRequest({ error: 'El número de registro profesional ya existe' })
    }

    try {
      validarTraslapes(horarios)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }

    const especialista = await Specialist.create(payload)

    if (Array.isArray(horarios)) {
      for (const h of horarios) {
        await SpecialistSchedule.create({
          specialistId: especialista.id,
          dia: h.dia,
          horaInicio: h.hora_inicio,
          horaFin: h.hora_fin,
        })
      }
    }

    await especialista.load('horarios')
    return response.created(especialista)
  }

  // Ver detalle
  async show({ params, response }: HttpContext) {
    const especialista = await Specialist.findOrFail(params.id)
    await especialista.load('horarios')
    return response.ok(especialista)
  }

  // Editar especialista
  async update({ request, params, response }: HttpContext) {
    const especialista = await Specialist.findOrFail(params.id)
    const payload = await request.validateUsing(specialistValidator)
    const horarios = request.input('horarios')

    // Validar duplicidad solo si se está actualizando el registro profesional
    if (payload.registro_profesional) {
      const existente = await Specialist
        .query()
        .where('registro_profesional', payload.registro_profesional)
        .whereNot('id', especialista.id)
        .first()

      if (existente) {
        return response.badRequest({ error: 'Otro especialista ya tiene ese número de registro profesional' })
      }
    }

    // Validar y actualizar horarios si vienen en la solicitud
    if (Array.isArray(horarios)) {
      try {
        validarTraslapes(horarios)
      } catch (error) {
        return response.badRequest({ error: error.message })
      }

      await SpecialistSchedule.query().where('specialist_id', especialista.id).delete()

      for (const h of horarios) {
        await SpecialistSchedule.create({
          specialistId: especialista.id,
          dia: h.dia,
          horaInicio: h.hora_inicio,
          horaFin: h.hora_fin,
        })
      }
    }

    especialista.merge(payload)
    await especialista.save()
    await especialista.load('horarios')

    return response.ok(especialista)
  }

  // Soft delete
  async destroy({ params, response }: HttpContext) {
    const especialista = await Specialist.findOrFail(params.id)
    especialista.activo = false
    await especialista.save()
    return response.ok({ mensaje: 'Especialista inactivado' })
  }

  // Restaurar
  async restore({ params, response }: HttpContext) {
    const especialista = await Specialist.findOrFail(params.id)
    especialista.activo = true
    await especialista.save()
    return response.ok({ mensaje: 'Especialista restaurado' })
  }

  // Eliminación definitiva
  async forceDelete({ params, response }: HttpContext) {
    const especialista = await Specialist.findOrFail(params.id)
    await especialista.delete()
    return response.ok({ mensaje: 'Especialista eliminado permanentemente' })
  }
}
