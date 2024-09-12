import dotenv from 'dotenv'

dotenv.config() // Load environment variables into the process

// Firebase service account
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
}

const env = {
    port: process.env.PORT || '8080',
    environment: process.env.ENVIRONMENT || 'development',
    mongodb_uri: process.env.MONGODB_URI || '',
    redis_url: process.env.REDIS_URL || '',
    google_bucket_url: process.env.GBUCKET_URL || '',
    key_path: process.env.KEY_PAH || 'key.json',
    jwt_signature: process.env.JWT_SIGNATURE || '',
    service: serviceAccount ?? {},
}

export default env
