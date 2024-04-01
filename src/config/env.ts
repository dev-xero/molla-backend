import dotenv from 'dotenv'

dotenv.config() // Load environment variables into the process

const env = {
    port: process.env.PORT || '8080',
    environment: process.env.ENVIRONMENT || 'development',
    mongodb_uri: process.env.MONGODB_URI || '',
    google_bucket_url: process.env.GBUCKET_URL || '',
    key_path: process.env.KEY_PAH || 'key.json',
    jwt_signature: process.env.JWT_SIGNATURE || ''
}

export default env
