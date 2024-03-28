import express from 'express'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'
import { exit } from 'process'

import env from '@config/env'
import { LogLevel, logMessage } from '@util/logger'
import { syncWithURI } from '@database/connection'
import { seedDatabase } from '@database/seeder'
import productModel from '@model/product'
import { productRouter } from 'route/products.route'

const port = env.port
const environment = env.environment
const mongoDBUri = env.mongodb_uri

const application = express()
const corsOptions: CorsOptions = {
    origin: ['http://localhost:*', 'https://molla-frontend.vercel.app/'],
    credentials: true,
    optionsSuccessStatus: 200,
}

// Enable cors, set secure headers
application.use(cors(corsOptions))
application.use(helmet())

// Register routers
application.use('/products', productRouter)

application.get('/', (_, res) => {
    res.status(200).json({
        message: "Welcome to Molla's backend API.",
        success: true,
        code: 200,
        payload: null,
    })
})

application.all('*', (_, res) => {
    res.status(404).json({
        message: 'Undefined endpoint accessed.',
        success: false,
        code: 404,
        payload: null,
    })
})

// Connect to the database and listen for requests
syncWithURI(mongoDBUri).then((conn) => {
    if (!conn) {
        logMessage(LogLevel.ERROR, 'failed to establish a database connection.')
        exit(1)
    }

    logMessage(LogLevel.INFO, 'successfully established a database connection.')

    seedDatabase(productModel, (err, success) => {
        if (err || !success) {
            logMessage(LogLevel.ERROR, 'could not seed database.')
            exit(1)
        }
        logMessage(LogLevel.SUCCESS, 'successfully seeded the database.')
    })

    application.listen(port, () => {
        const address =
            environment == 'development'
                ? `${process.env.ADDRESS}:${port}`
                : `${process.env.ADDRESS}`

        logMessage(LogLevel.INFO, `application listening on port:${port}`)
        logMessage(LogLevel.INFO, `api live at - ${address}`)
    })
})
