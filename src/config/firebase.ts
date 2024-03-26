import admin from 'firebase-admin'
import env from './env'
import { LogLevel, logMessage } from '@util/logger'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import '@secret/service-account-key.json' assert { type: 'json' } // include with tsc build

const __filename = fileURLToPath(import.meta.url)
let serviceAccount = join(
    dirname(dirname(__filename)),
    'secret',
    'service-account-key.json',
)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: env.google_bucket_url,
})

export const bucket = admin.storage().bucket()

export async function getBucketFileURL(path: string): Promise<string> {
    const file = bucket.file(path)
    const expiryDate = new Date()

    expiryDate.setFullYear(expiryDate.getFullYear() + 10)

    return file
        .getSignedUrl({
            action: 'read',
            expires: expiryDate,
        })
        .then((url: any) => {
            logMessage(LogLevel.SUCCESS, `url - ${url}`)
            return url[0]
        })
        .catch((error: Error) => {
            logMessage(LogLevel.ERROR, 'Failed to get download URL')
            logMessage(LogLevel.ERROR, error.message)
            throw error
        })
}
