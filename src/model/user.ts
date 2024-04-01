import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

export interface UserInterface {
    id?: ObjectId
    username: string
    password: string
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

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password // never include the password field

    return userObject
}

const userModel = mongoose.model('User', userSchema)
export default userModel
