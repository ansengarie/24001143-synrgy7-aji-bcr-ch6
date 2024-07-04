import { type Response, type Request, type Express } from 'express'
import { ResponseHelper } from '../helpers/response.helper'
import { type Users } from '../databases/models/users'
import { UserService } from '../services/user.service'
import { OAuth2Client } from 'google-auth-library'
import { config } from 'dotenv'
import { ErrorHelper } from '../helpers/error.helper'

config()

// const ClientId = process.env.GOOGLE_CLIENT_ID
// const ClientSecret = process.env.GOOGLE_SECRET
// const oAuth2Client = new OAuth2Client(ClientId, ClientSecret, 'postmessage')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export class UserController {
  public userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async store(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.create(req.body)

      ResponseHelper.success('Data disimpan', user, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async register(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.register(req.body)

      ResponseHelper.success('Data disimpan', user, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async login(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.login(req.body.email, req.body.password)

      ResponseHelper.success('Berhasil login', user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async loginWithGoogle(
    req: Request<Record<string, unknown>, Record<string, unknown>, Users>,
    res: Response
  ): Promise<void> {
    try {
      const { token } = req.body

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload()
      if (!payload) {
        throw new Error('Invalid Google token')
      }

      const user = await this.userService.loginWithGoogle(payload)

      ResponseHelper.success('Login with Google successfully', user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user
      await this.userService.logout(user)

      ResponseHelper.success('Berhasil logout', null, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async whoami(req: Request, res: Response): Promise<void> {
    try {
      ResponseHelper.success('Berhasil mendapatkan data user', req.user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.list(req.query)

      ResponseHelper.success('Data ditemukan', users)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}
