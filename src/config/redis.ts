import { createClient } from 'redis'
import env from './env'
import { LogLevel, log } from '@util/logger'
import { exit } from 'process'

const redisClient = createClient({
    url: env.redis_url,
})

redisClient.on('error', (err) => {
    log(LogLevel.ERROR, `Redis client failed to connect.\nERR: ${err}`)
    exit(1)
})

export default redisClient
