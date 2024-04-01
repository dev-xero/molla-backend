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
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: Boolean,
})

const userModel = mongoose.model('User', userSchema)
export default userModel
