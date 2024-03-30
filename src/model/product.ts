import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    id: ObjectId,
    title: String,
    short_desc: String,
    long_desc: String,
    image: String,
    category: String,
    color: String,
    rating: Number,
    price: Number,
    stock: Number,
    reviews: Number,
})

const productModel = mongoose.model('Product', productSchema)
export default productModel
