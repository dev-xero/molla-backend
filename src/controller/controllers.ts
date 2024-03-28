import { getAllProducts } from './products/getAllProducts.controllers'
import { getProductByID } from './products/getProductByID'
import { uploadProduct } from './products/uploadProduct'

export const products = {
    all: getAllProducts,
    byID: getProductByID,
    upload: uploadProduct,
}
