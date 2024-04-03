import jwt from 'jsonwebtoken'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import userModel, { UserInterface } from '@model/user'
import { LogLevel, logMessage } from '@util/logger'
import { sendJsonResponse } from '@util/response'
import { Request, Response } from 'express'
import { userZodSchema } from 'validator/user.validator'
import env from '@config/env'

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
            const errMessage = isReqBodyValid.error.issues[0].message
            logMessage(LogLevel.ERROR, errMessage)
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

        // Prevent duplicate accounts from being created
        const userExists = await userModel.findOne({
            $or: [
                { username: userReqBody.username },
                { email: userReqBody.email },
            ],
        })
        if (userExists) {
            sendJsonResponse(
                {
                    message: 'A user with those credentials already exists.',
                    code: 400,
                    payload: null,
                },
                res,
            )
            return
        }

        // Don't save the plain text password, hash it first
        const hashedPassword = hashSync(userReqBody.password, genSaltSync(10))
        const dbUser: UserInterface = {
            username: userReqBody.username,
            password: hashedPassword,
            email: userReqBody.email,
            isAdmin: userReqBody.isAdmin,
        }

        // Create the new user collection and sign the jwt
        await userModel.create(dbUser).then((user) => {
            const signature = env.jwt_signature
            if (signature == '') {
                // Configuration error
                userModel.findByIdAndDelete(user._id).then(() => {
                    sendJsonResponse(
                        {
                            message:
                                'Internal server error, missing server configuration.',
                            code: 500,
                            payload: null,
                        },
                        res,
                    )
                })
            } else {
                // User passed all checks, successfully created
                const cb = (_: unknown, token: any) => {
                    logMessage(
                        LogLevel.SUCCESS,
                        'successfully created new user.',
                    )
                    logMessage(LogLevel.INFO, user)

                    sendJsonResponse(
                        {
                            message: 'Successfully created new user.',
                            code: 201,
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
        })
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
