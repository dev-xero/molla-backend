import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    title: String,
    description: String,
    url: String,
    category: String,
    color: String,
    price: Number,
})

const productModel = mongoose.model('Product', productSchema)
export default productModel
