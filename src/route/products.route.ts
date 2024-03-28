import express from 'express'
import { sendJsonResponse } from '@util/response'

const productRouter = express.Router()

productRouter.get("/", (_, res) => {
    sendJsonResponse(
        {
            message: "GET all products.",
            code: 200,
            payload: null,
        },
        res,
    )
    return
})

export { productRouter }