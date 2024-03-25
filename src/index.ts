import express from 'express'
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'

dotenv.config() // Load environment variables into the process
const port = process.env.PORT || '8080'
const environment = process.env.ENVIRONMENT || 'development'

const application = express()
const corsOptions: CorsOptions = {
    origin: ['http://localhost:*', 'https://molla-frontend.vercel.app/'],
    credentials: true,
    optionsSuccessStatus: 200,
}

// Enable cors
application.use(cors(corsOptions))

application.get('/', (_, res) => {
    res.json({
        message: "Welcome to Molla's backend API",
        success: true,
        payload: null,
    })
})

application.use((_, res) => {
    res.json({
        message: 'Undefined endpoint accessed.',
        success: false,
        payload: null,
    })
})

application.listen(port, () => {
    const address =
        environment == 'development'
            ? `${process.env.ADDRESS}:${port}`
            : `${process.env.ADDRESS}`
    console.log('[LOG]: application listening on port', port)
    console.log('[LOG]: api live at -', address)
})
