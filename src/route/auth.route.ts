import { sendJsonResponse } from '@util/response'
import express, { Request, Response } from 'express'

const authRouter = express.Router()

/*
*   This function handles signing-up users, it accepts three parameters from the
    request body:
*       1. username
*       2. password
*       3. email
*   It verifies the data then creates a new document containing the user data, then responds 
*   with a JWT token and the user object.
 */
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
