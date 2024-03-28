import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    id: ObjectId,
    title: String,
    description: String,
    image: String,
    category: String,
    color: String,
    rating: Number,
    price: Number,
})

const productModel = mongoose.model('Product', productSchema)
export default productModel
