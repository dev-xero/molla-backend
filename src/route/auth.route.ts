import { auth } from '@controller/controllers'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/sign-up', auth.signup)
authRouter.post('/sign-in', auth.signIn)

export { authRouter }
