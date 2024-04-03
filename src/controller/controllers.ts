import { signIn } from './auth/signin'
import { signUp } from './auth/signup'
import { getAllProducts } from './products/getallproducts'
import { getProductByID } from './products/getproductbyid'
import { uploadProduct } from './products/uploadproducts'

export const products = {
    all: getAllProducts,
    byID: getProductByID,
    upload: uploadProduct,
}

export const auth = {
    signup: signUp,
    signIn: signIn
}
