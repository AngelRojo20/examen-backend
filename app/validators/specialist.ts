import vine from '@vinejs/vine'

export const specialistValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().minLength(3).optional(),
    especialidad: vine.string().trim().optional(),
    registro_profesional: vine.string().trim().optional(),
  })
)
