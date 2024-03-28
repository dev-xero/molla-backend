import { getAllProducts } from './products/getAllProducts.controllers'
import { uploadProduct } from './products/uploadProduct'

export const products = {
    all: getAllProducts,
    upload: uploadProduct,
}
