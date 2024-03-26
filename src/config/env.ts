import dotenv from 'dotenv'

dotenv.config() // Load environment variables into the process

const env = {
    port: process.env.PORT || '8080',
    environment: process.env.ENVIRONMENT || 'development',
    mongodb_uri: process.env.MONGODB_URI || '',
}

export default env
