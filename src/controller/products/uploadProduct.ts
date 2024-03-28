import { logMessage, LogLevel } from '@util/logger'
import { sendJsonResponse } from '@util/response'
import { Request, Response } from 'express'

export function uploadProduct(req: Request, res: Response) {
    logMessage(LogLevel.INFO, req.body)
    sendJsonResponse(
        {
            message: 'Upload products.',
            code: 200,
            payload: null,
        },
        res,
    )
    return
}
