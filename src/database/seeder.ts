import productModel from '@model/product'
import { LogLevel, logMessage } from '@util/logger'
import productList from '@data/seed.json'

type CallbackFunction<T> = (error: any | null, data: T | null) => void

export function seedDatabase(
    model: typeof productModel,
    callback: CallbackFunction<boolean>,
) {
    // Delete any previous data and then insert
    model.deleteMany({})
    model
        .insertMany(productList)
        .then(() => callback(null, true))
        .catch((error) => callback(error, false))
}
