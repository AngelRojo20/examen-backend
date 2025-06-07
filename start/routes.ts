/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const SpecialistsController = () => import('#controllers/specialists_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [SpecialistsController, 'index'])
    router.get('/inactivos', [SpecialistsController, 'inactivos'])
    router.post('/', [SpecialistsController, 'store'])
    router.get('/:id', [SpecialistsController, 'show'])
    router.patch('/:id', [SpecialistsController, 'update'])
    router.delete('/:id', [SpecialistsController, 'destroy'])
    router.post('/:id/restore', [SpecialistsController, 'restore'])
    router.delete('/:id/force', [SpecialistsController, 'forceDelete'])
  })
  .prefix('/especialistas')
