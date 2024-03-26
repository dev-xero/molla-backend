import mongoose from 'mongoose'

export async function syncWithURI(uri: string) {
    console.log('[LOG]: Connecting to remote database...')
    try {
        const conn = await mongoose.connect(uri)
        return conn
    } catch (error) {
        console.error('[ERR]:', error)
        return null
    }
}
