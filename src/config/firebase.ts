import admin from 'firebase-admin'
import env from './env'
import { LogLevel, log } from '@util/logger'

admin.initializeApp({
    credential: admin.credential.cert(env.key_path),
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
        .then((url: Array<string>) => {
            // logMessage(LogLevel.SUCCESS, `url - ${url}`)
            return url[0]
        })
        .catch((error: Error) => {
            log(LogLevel.ERROR, 'Failed to get download URL.')
            log(LogLevel.ERROR, error.message)
            throw error
        })
}
