import { LogLevels, logMessage } from '@util/logger'
import mongoose from 'mongoose'

export async function syncWithURI(uri: string) {
    logMessage(LogLevels.INFO, 'connecting to the remote database...')
    try {
        const conn = await mongoose.connect(uri)
        return conn
    } catch (error) {
        console.error('[ERR]:', error)
        return null
    }
}
