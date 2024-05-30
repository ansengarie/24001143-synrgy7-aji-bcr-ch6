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
  //register admin
  users.post('/', authenticateTokenSuperAdmin, userController.store.bind(userController))
  //login
  users.post('/login', userController.login.bind(userController))
  //whoami
  users.get('/whoami', authenticateToken, userController.whoami.bind(userController))
  //list
  users.get('/', authenticateTokenAdmin, userController.list.bind(userController))

  //register
  users.post('/register', userController.register.bind(userController))
  //logout
  users.post('/logout', userController.logout.bind(userController))
})

// cars
root.group('/cars', (cars) => {
  //list admin
  cars.get('/', authenticateTokenAdmin, carController.list.bind(carController))
  //list public
  cars.get('/public', carController.listPublic.bind(carController))
  //create car
  cars.post('/', authenticateTokenAdmin, upload.single('image'), carController.create.bind(carController))
  //show car by id
  cars.get('/:id', authenticateTokenAdmin, carController.show.bind(carController))
  //update car
  cars.patch('/:id', authenticateTokenAdmin, upload.single('image'), carController.update.bind(carController))
  //delete car
  cars.delete('/:id', authenticateTokenAdmin, carController.delete.bind(carController))
})

export default route
