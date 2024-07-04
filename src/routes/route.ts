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
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register admin
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */
root.group('/users', (users) => {
  users.post('/', authenticateTokenSuperAdmin, userController.store.bind(userController))

  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: User login
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: User logged in successfully
   */
  users.post('/login', userController.login.bind(userController))
  users.post('/auth/google', userController.loginWithGoogle.bind(userController))
  /**
   * @swagger
   * /users/whoami:
   *   get:
   *     summary: Get user info
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: User information retrieved successfully
   */
  users.get('/whoami', authenticateToken, userController.whoami.bind(userController))

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: List users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   */
  users.get('/', authenticateTokenAdmin, userController.list.bind(userController))

  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Users]
   *     responses:
   *       201:
   *         description: User registered successfully
   */
  users.post('/register', userController.register.bind(userController))

  /**
   * @swagger
   * /users/logout:
   *   post:
   *     summary: User logout
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: User logged out successfully
   */
  users.post('/logout', userController.logout.bind(userController))
})

// cars
root.group('/cars', (cars) => {
  /**
   * @swagger
   * /cars:
   *   get:
   *     summary: List cars for admin
   *     tags: [Cars]
   *     responses:
   *       200:
   *         description: List of cars retrieved successfully
   */
  cars.get('/', carController.list.bind(carController))

  /**
   * @swagger
   * /cars/public:
   *   get:
   *     summary: List public cars
   *     tags: [Cars]
   *     responses:
   *       200:
   *         description: List of public cars retrieved successfully
   */
  cars.get('/public', carController.listPublic.bind(carController))

  /**
   * @swagger
   * /cars:
   *   post:
   *     summary: Create a new car
   *     tags: [Cars]
   *     responses:
   *       201:
   *         description: Car created successfully
   */
  cars.post('/', authenticateTokenAdmin, upload.single('image'), carController.create.bind(carController))

  /**
   * @swagger
   * /cars/{id}:
   *   get:
   *     summary: Get car by ID
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Car ID
   *     responses:
   *       200:
   *         description: Car details retrieved successfully
   */
  cars.get('/:id', authenticateTokenAdmin, carController.show.bind(carController))

  /**
   * @swagger
   * /cars/{id}:
   *   patch:
   *     summary: Update car
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Car ID
   *     responses:
   *       200:
   *         description: Car updated successfully
   */
  cars.patch('/:id', authenticateTokenAdmin, upload.single('image'), carController.update.bind(carController))

  /**
   * @swagger
   * /cars/{id}:
   *   delete:
   *     summary: Delete car
   *     tags: [Cars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Car ID
   *     responses:
   *       204:
   *         description: Car deleted successfully
   */
  cars.delete('/:id', authenticateTokenAdmin, carController.delete.bind(carController))
})

export default route
