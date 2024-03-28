import { Request, Response } from 'express'
import { sendJsonResponse } from '@util/response'

export function getAllProducts(_: Request, res: Response) {
    sendJsonResponse(
        {
            message: 'GET all products.',
            code: 200,
            payload: null,
        },
        res,
    )
    return
}
