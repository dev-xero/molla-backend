import productModel from '@model/product'
import seedJSON from '@data/seed.json' assert { type: 'json' }

type CallbackFunction<T> = (error: any | null, data: T | null) => void

export function seedDatabase(
    model: typeof productModel,
    callback: CallbackFunction<boolean>,
) {
    // Delete any previous data and then insert
    model.deleteMany({})
    model
        .insertMany(seedJSON)
        .then(() => callback(null, true))
        .catch((error) => callback(error, false))
}
