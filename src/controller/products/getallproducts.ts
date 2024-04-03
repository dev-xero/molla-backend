import productModel from '@model/product'
import { Request, Response } from 'express'
import { sendJsonResponse } from '@util/response'
import { log, LogLevel } from '@util/logger'

export async function getAllProducts(_: Request, res: Response) {
    // Get all products from the database
    try {
        await productModel
            .find({})
            .lean()
            .then((products) => {
                log(LogLevel.INFO, products)
                let responsePayload: Array<any> = []
                products.forEach((product) => responsePayload.push(product))
                sendJsonResponse(
                    {
                        message: 'GET all products.',
                        code: 200,
                        payload: responsePayload,
                    },
                    res,
                )
            })

        return
    } catch (error) {
        log(LogLevel.ERROR, 'failed to fetch all products')
        console.error(error)
        sendJsonResponse(
            {
                message: 'An internal server error occurred.',
                code: 500,
                payload: null,
            },
            res,
        )
        return
    }
}
