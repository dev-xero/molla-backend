import { sendJsonResponse } from '@util/response'
import { Request, Response } from 'express'
import { userZodSchema } from 'validator/user.validator'

/*
*   signUp() handles signing-up users, it accepts three parameters from the
    request body:
*       1. username
*       2. password
*       3. email
*   It verifies the data then creates a new document containing the user data, then responds 
*   with a JWT token and the user object.
 */
export function signUp(req: Request, res: Response) {
    const userReqBody = req.body
    const isReqBodyValid = userZodSchema.safeParse(userReqBody)

    // Make sure the client sends the required sign-up data
    if (!isReqBodyValid.success) {
        console.log(isReqBodyValid.error)
        sendJsonResponse(
            {
                message: 'Incomplete sign-up parameters sent.',
                code: 401,
                payload: null,
            },
            res,
        )
        return
    }

    sendJsonResponse(
        {
            message: 'Sign up route accessed.',
            code: 200,
            payload: null,
        },
        res,
    )
    return
}
