import { Router } from 'express'
import RouteGroup from 'express-route-grouping'
import { CarsController } from '../controllers/car.controller'
import { UserController } from '../controllers/user.controller'
import { authenticateToken, authenticateTokenAdmin, authenticateTokenSuperAdmin } from '../middlewares/authorization'
import upload from '../utils/upload.on.memory'

export const route = Router()
const root = new RouteGroup('/', route)

const carController = new CarsController()
const userController = new UserController()

// users
root.group('/users', (users) => {
  users.post('/', authenticateTokenSuperAdmin, userController.store.bind(userController))
  users.post('/login', userController.login.bind(userController))
  users.post('/auth/google', userController.loginWithGoogle.bind(userController))
  users.get('/whoami', authenticateToken, userController.whoami.bind(userController))
  users.get('/', authenticateTokenAdmin, userController.list.bind(userController))
  users.post('/register', userController.register.bind(userController))
  users.post('/logout', userController.logout.bind(userController))
})

// cars
root.group('/cars', (cars) => {
  cars.get('/', carController.list.bind(carController))
  cars.get('/public', carController.listPublic.bind(carController))
  cars.post('/', authenticateTokenAdmin, upload.single('image'), carController.create.bind(carController))
  cars.get('/:id', authenticateTokenAdmin, carController.show.bind(carController))
  cars.patch('/:id', authenticateTokenAdmin, upload.single('image'), carController.update.bind(carController))
  cars.delete('/:id', authenticateTokenAdmin, carController.delete.bind(carController))
})

export default route
