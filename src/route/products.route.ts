import express from 'express'

const productRouter = express.Router()

productRouter.get("/", (_, res) => {
    res.status(200).json({
        message: "GET all products",
        success: true,
        code: 200,
        payload: null
    })
})

export { productRouter }