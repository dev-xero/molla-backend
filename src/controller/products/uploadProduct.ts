import { log, LogLevel } from '@util/logger'
import { sendJsonResponse } from '@util/response'
import { Request, Response } from 'express'

export function uploadProduct(req: Request, res: Response) {
    log(LogLevel.INFO, req.body)
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
