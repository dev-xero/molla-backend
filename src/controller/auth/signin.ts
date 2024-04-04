import jwt from 'jsonwebtoken'
import env from '@config/env'
import userModel from '@model/user'
import { compareSync } from 'bcrypt-ts'
import { LogLevel, log } from '@util/logger'
import { sendJsonResponse } from '@util/response'
import { userSignInZodSchema } from '@validator/user.validator'
import { Request, Response } from 'express'

/*
*   signIn() verifies data provided by the user and returns a JWT when authenticated
    request body:
*       1. email
*       2. password
*/
export async function signIn(req: Request, res: Response) {
    try {
        const userReqBody = req.body
        const isReqBodyValid = userSignInZodSchema.safeParse(userReqBody)

        // Again, verify sent data
        if (!isReqBodyValid.success) {
            const errMessage = isReqBodyValid.error.issues[0].message
            log(LogLevel.ERROR, errMessage)
            sendJsonResponse(
                {
                    message: errMessage,
                    code: 401,
                    payload: null,
                },
                res,
            )
            return
        }

        // Find the user with the provided email and password
        const user = await userModel.findOne({ email: userReqBody.email })

        // User could possibly not exist
        if (!user) {
            sendJsonResponse(
                {
                    message: 'Invalid sign-in credentials.',
                    code: 401,
                    payload: null,
                },
                res,
            )
            return
        }

        const passwordMatches = compareSync(userReqBody.password, user.password)

        if (!passwordMatches) {
            sendJsonResponse(
                {
                    message: 'Passwords mismatch.',
                    code: 401,
                    payload: null,
                },
                res,
            )
            return
        } else {
            const signature = env.jwt_signature
            // signature needs to be loaded into env variables
            if (signature == '') {
                // Configuration error
                sendJsonResponse(
                    {
                        message:
                            'Internal server error, missing server configuration.',
                        code: 500,
                        payload: null,
                    },
                    res,
                )
            }
            // User passed all checks, successfully signed-in
            const cb = (_: unknown, token: unknown) => {
                log(LogLevel.SUCCESS, 'successfully signed-in user')
                log(LogLevel.INFO, user)

                sendJsonResponse(
                    {
                        message: 'Successfully signed-in user.',
                        code: 200,
                        payload: {
                            user,
                            token,
                        },
                    },
                    res,
                )
                return
            }
            jwt.sign({ id: user.id }, signature, cb)
        }
    } catch (error) {
        log(LogLevel.ERROR, 'failed to sign-in user.')
        log(LogLevel.ERROR, error)
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
