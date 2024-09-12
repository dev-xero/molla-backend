import { createClient } from 'redis'
import env from './env'
import { LogLevel, log } from '@util/logger'

const redisClient = createClient({
    url: env.redis_url,
})

redisClient.on('error', (err) =>
    log(LogLevel.ERROR, `Redis client failed to connect.\nERR: ${err}`),
)

export default redisClient
