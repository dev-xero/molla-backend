import { LogLevel, log } from '@util/logger'
import mongoose from 'mongoose'

export async function syncWithURI(uri: string) {
    log(LogLevel.INFO, 'connecting to the remote database...')
    try {
        const conn = await mongoose.connect(uri)
        return conn
    } catch (error) {
        console.error('[ERR]:', error)
        return null
    }
}
