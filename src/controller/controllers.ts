import { signUp } from './auth/signUp'
import { getAllProducts } from './products/getAllProducts'
import { getProductByID } from './products/getProductByID'
import { uploadProduct } from './products/uploadProduct'

export const products = {
    all: getAllProducts,
    byID: getProductByID,
    upload: uploadProduct,
}

export const auth = {
    signup: signUp
}
