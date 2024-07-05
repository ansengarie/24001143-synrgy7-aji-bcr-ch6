import { Router } from 'express'
import RouteGroup from 'express-route-grouping'
import { CarsController } from '../controllers/car.controller'
import { UserController } from '../controllers/user.controller'
import { authenticateToken, authenticateTokenAdmin, authenticateTokenSuperAdmin } from '../middlewares/authorization'
import upload from '../utils/upload.on.memory'

export const route = Router()
const root = new RouteGroup('/api/v1', route)

const carController = new CarsController()
const userController = new UserController()

// users
root.group('/users', (users) => {
  /**
   * @swagger
   * /api/v1/users/:
   *   post:
   *     tags:
   *       - Super Admin
   *     summary: Create Admin
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example:
   *               name: "aji"
   *               email: "aji@gmail.com"
   *               password: "123123"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       201:
   *         description: Created
   *         headers:
   *           X-Powered-By:
   *             schema:
   *               type: string
   *               example: "Express"
   *           Access-Control-Allow-Origin:
   *             schema:
   *               type: string
   *               example: "*"
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: "application/json; charset=utf-8"
   *           Content-Length:
   *             schema:
   *               type: integer
   *               example: 329
   *           ETag:
   *             schema:
   *               type: string
   *               example: "W/\"149-TfAEeMMcftZLvsW1yI4cjOmOl8c\""
   *           Date:
   *             schema:
   *               type: string
   *               example: "Fri, 05 Jul 2024 01:38:27 GMT"
   *           Connection:
   *             schema:
   *               type: string
   *               example: "keep-alive"
   *           Keep-Alive:
   *             schema:
   *               type: string
   *               example: "timeout=5"
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *             example:
   *               code: 201
   *               status: "success"
   *               message: "Data disimpan"
   *               data:
   *                 name: "aji"
   *                 email: "aji@gmail.com"
   *                 password: "$2b$10$0rYo3jfCy8EwE02dh6wzhOySrfKtCcIzL0dJsf/VfHdCzQy2gpkuS"
   *                 id: "070bd32e-a8c6-41f0-90a4-704e9a974176"
   *                 role: "admin"
   *                 token: null
   *                 created_at: "2024-07-05T01:38:27.751Z"
   *                 updated_at: "2024-07-05T01:38:27.751Z"
   */
  users.post('/', authenticateTokenSuperAdmin, userController.store.bind(userController))

  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     tags:
   *       - Member
   *     summary: Login
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example:
   *               email: "herlan@gmail.com"
   *               password: "123123"
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  users.post('/login', userController.login.bind(userController))
  users.post('/auth/google', userController.loginWithGoogle.bind(userController))

  /**
   * @swagger
   * /api/v1/users/whoami:
   *   get:
   *     tags:
   *       - Super Admin
   *     summary: WHOAMI
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  users.get('/whoami', authenticateToken, userController.whoami.bind(userController))

  /**
   * @swagger
   * /api/v1/users/:
   *   get:
   *     tags:
   *       - Super Admin
   *     summary: List User
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  users.get('/', authenticateTokenAdmin, userController.list.bind(userController))

  /**
   * @swagger
   * /api/v1/users/register:
   *   post:
   *     tags:
   *       - Member
   *     summary: Register
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             example:
   *               name: "herlan"
   *               email: "herlan@gmail.com"
   *               password: "123123"
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  users.post('/register', userController.register.bind(userController))

  /**
   * @swagger
   * /api/v1/users/logout:
   *   post:
   *     tags:
   *       - Member
   *     summary: User logout
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
   * /api/v1/cars:
   *   get:
   *     tags:
   *       - Member
   *     summary: List Car Public
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  cars.get('/public', carController.listPublic.bind(carController))

  /**
   * @swagger
   * /api/v1/cars:
   *   post:
   *     tags:
   *       - Super Admin
   *     summary: Create Cars
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               plate:
   *                 type: string
   *                 example: "CCCCCCCCCC"
   *               manufacture:
   *                 type: string
   *                 example: "BBBB"
   *               model:
   *                 type: string
   *                 example: "BBBB"
   *               image:
   *                 type: string
   *                 format: binary
   *               image_public_id:
   *                 type: string
   *                 example: "ngantuk"
   *               rent_per_day:
   *                 type: integer
   *                 example: "1000"
   *               capacity:
   *                 type: integer
   *                 example: "6"
   *               description:
   *                 type: string
   *                 example: "bagus"
   *               available_at:
   *                 type: string
   *                 example: "2024-07-03T00:40:18.824Z"
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json: {}
   */
  cars.post('/', authenticateTokenSuperAdmin, upload.single('image'), carController.create.bind(carController))

  /**
   * @swagger
   * /api/v1/cars:
   *   get:
   *     tags:
   *       - Super Admin
   *     summary: List Car Admin
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  cars.get('/', authenticateTokenAdmin, carController.list.bind(carController))

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   get:
   *     tags:
   *       - Member
   *     summary: Show Car
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: "4d9252dc-c5cf-4fcb-9b80-07c032b0d4ef"
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  cars.get('/:id', carController.show.bind(carController))

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   put:
   *     tags:
   *       - Super Admin
   *     summary: Update Car
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               plate:
   *                 type: string
   *                 example: "BBBB"
   *               manufacture:
   *                 type: string
   *                 example: "BBBB"
   *               model:
   *                 type: string
   *                 example: "BBBB"
   *               image:
   *                 type: string
   *                 format: binary
   *               image_public_id:
   *                 type: string
   *                 example: "ngantuk"
   *               rent_per_day:
   *                 type: integer
   *                 example: "1000"
   *               capacity:
   *                 type: integer
   *                 example: "6"
   *               description:
   *                 type: string
   *                 example: "bagus"
   *               available_at:
   *                 type: string
   *                 example: "2024-07-03T00:40:18.824Z"
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: "4d9252dc-c5cf-4fcb-9b80-07c032b0d4ef"
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  cars.put('/:id', authenticateTokenSuperAdmin, upload.single('image'), carController.update.bind(carController))

  /**
   * @swagger
   * /api/v1/cars/{id}:
   *   delete:
   *     tags:
   *       - Super Admin
   *     summary: Delete Car
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: "4d9252dc-c5cf-4fcb-9b80-07c032b0d4ef"
   *     responses:
   *       204:
   *         description: Successful response
   *         content:
   *           application/json: {}
   */
  cars.delete('/:id', authenticateTokenSuperAdmin, carController.delete.bind(carController))
})

export default root
