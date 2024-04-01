import { sendJsonResponse } from '@util/response'
import express, { Request, Response } from 'express'

const authRouter = express.Router()

authRouter.post('/sign-up', (_: Request, res: Response) => {
    sendJsonResponse(
        {
            message: 'Sign up route accessed',
            code: 200,
            payload: null,
        },
        res,
    )
    return
})

export { authRouter }
