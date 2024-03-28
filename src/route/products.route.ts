import { products } from '@controller/controllers'
import express from 'express'

const productRouter = express.Router()

productRouter.get('/', products.all)
productRouter.post('/upload', products.upload)

export { productRouter }
