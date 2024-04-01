import express from 'express'
import { products } from '@controller/controllers'

const productRouter = express.Router()

productRouter.get('/', products.all)
productRouter.get('/single', products.byID)
productRouter.post('/upload', products.upload)

export { productRouter }
