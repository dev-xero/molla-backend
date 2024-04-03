import productModel from '@model/product'
import seedJSON from '@data/seed.json' assert { type: 'json' }
import { getBucketFileURL } from '@config/firebase'
import { LogLevel, log } from '@util/logger'

type CallbackFunction<T> = (error: any | null, data: T | null) => void

export async function seedDatabase(
    model: typeof productModel,
    callback: CallbackFunction<boolean>,
) {
    try {
        // Map the json data urls to their bucket links
        const linkedSeedList = await Promise.all(
            seedJSON.map(async (product) => {
                const imageBucketLink = await getBucketFileURL(product.image)
                product.image = imageBucketLink
                return product
            }),
        )
        log(LogLevel.INFO, 'successfully mapped image urls.')
        // Delete any previous data and then insert
        model.deleteMany({}).then(() => {
            model
                .insertMany(linkedSeedList)
                .then(() => callback(null, true))
                .catch((error) => callback(error, false))
        })
    } catch (error: any) {
        log(LogLevel.ERROR, error.message)
        callback(error, false)
    }
}
