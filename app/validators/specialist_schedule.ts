import vine from '@vinejs/vine'

export const specialistScheduleValidator = vine.compile(
  vine.object({
    specialist_id: vine.number().positive(),
    horarios: vine.array(
      vine.object({
        dia: vine.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']),
        hora_inicio: vine.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
        hora_fin: vine.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      })
    ),
  })
)
