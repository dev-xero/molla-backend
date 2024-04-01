import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

export interface UserInterface {
    id: ObjectId
    username: string
    email: string
    isAdmin: boolean
}

const userSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    email: String,
    isAdmin: Boolean,
})

const userModel = mongoose.model('User', userSchema)
export default userModel
