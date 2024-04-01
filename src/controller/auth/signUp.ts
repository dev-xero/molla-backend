import userModel, { UserInterface } from '@model/user'
import { LogLevel, logMessage } from '@util/logger'
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
export async function signUp(req: Request, res: Response) {
    try {
        const userReqBody: UserInterface = req.body
        const isReqBodyValid = userZodSchema.safeParse(userReqBody)

        // Make sure the client sends the required sign-up data
        if (!isReqBodyValid.success) {
            console.log(isReqBodyValid.error)
            sendJsonResponse(
                {
                    message: 'Invalid sign-up parameters sent.',
                    code: 401,
                    payload: null,
                },
                res,
            )
            return
        }

        // Prevent duplicate accounts from being created
        const userExists = await userModel.findOne({ email: userReqBody.email })
        if (userExists) {
            sendJsonResponse(
                {
                    message: 'A user with that email already exists.',
                    code: 400,
                    payload: null,
                },
                res,
            )
            return
        } else {
            // Create the new user collection
            await userModel.create(userReqBody).then((user) => {
                logMessage(LogLevel.SUCCESS, 'successfully created new user.')
                logMessage(LogLevel.INFO, user)
                sendJsonResponse(
                    {
                        message: 'Successfully created new user.',
                        code: 200,
                        payload: user,
                    },
                    res,
                )
                return
            })
        }
    } catch (error) {
        logMessage(LogLevel.ERROR, 'failed to sign-up user.')
        logMessage(LogLevel.ERROR, error)
        sendJsonResponse(
            {
                message: 'Internal server error, failed to sign-up user.',
                code: 500,
                payload: null,
            },
            res,
        )
        return
    }
}
