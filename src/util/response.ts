import { Response } from 'express'

export type responseData = {
    message: string
    code: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
}

export function sendJsonResponse(data: responseData, res: Response) {
    res.status(data.code).json({
        message: data.message,
        success: data.code < 400,
        code: data.code,
        payload: data.payload,
    })
    return
}
