import productModel from '@model/product'
import { LogLevel, log } from '@util/logger'
import { sendJsonResponse } from '@util/response'
import { Request, Response } from 'express'

export async function getProductByID(req: Request, res: Response) {
    const productID = req.query['id']
    console.log(productID)
    try {
        await productModel
            .findById(productID)
            .lean()
            .then((product) => {
                console.log(product)
                if (!product) {
                    throw Error
                }
                sendJsonResponse(
                    {
                        message: 'GET product by an id.',
                        code: 200,
                        payload: product,
                    },
                    res,
                )
                return
            })
    } catch (error) {
        sendJsonResponse(
            {
                message: 'Product with that id not found.',
                code: 400,
                payload: null,
            },
            res,
        )
        return
    }
}
