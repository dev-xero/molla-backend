/* eslint-disable @typescript-eslint/no-explicit-any */
import productModel from '@model/product'
import { Request, Response } from 'express'
import { sendJsonResponse } from '@util/response'
import { log, LogLevel } from '@util/logger'
import redisClient from '@config/redis'

export async function getAllProducts(_: Request, res: Response) {
    // Get all products from the database
    try {
        // Firstly try to fetch from cache.
        const productsCache = await redisClient.get('products')
        if (productsCache) {
            const products = JSON.parse(productsCache);
            log(LogLevel.INFO, 'Redis cache HIT.')
            
            // console.log('HIT', products);

            sendJsonResponse(
                {
                    message: 'GET all products.',
                    code: 200,
                    payload: products,
                },
                res,
            )
        } else {
            log(LogLevel.INFO, 'Redis cache MISS, defaulting to db.')
            await productModel
                .find({})
                .lean()
                .then(async (products) => {
                    // log(LogLevel.INFO, products) - don't log this
                    const responsePayload: Array<any> = []
                    products.forEach((product) => responsePayload.push(product))

                    // Cache this result
                    await redisClient.set(
                        'products',
                        JSON.stringify(responsePayload),
                    )
                    log(LogLevel.INFO, 'Cached products array.')

                    sendJsonResponse(
                        {
                            message: 'GET all products.',
                            code: 200,
                            payload: responsePayload,
                        },
                        res,
                    )
                })
        }

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
