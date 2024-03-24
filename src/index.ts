import express from 'express'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables into the process
const port = process.env.PORT || '8080'
const environment = process.env.ENVIRONMENT || 'development'

const application = express()

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
    console.log('[LOG]: api live on -', address)
})
