import { auth } from '@controller/controllers'
import { sendJsonResponse } from '@util/response'
import express, { Request, Response } from 'express'

const authRouter = express.Router()

authRouter.post('/sign-up', auth.signup)

export { authRouter }
