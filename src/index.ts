import 'module-alias/register'

import express from 'express'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'
import { exit } from 'process'

import env from '@config/env'
import { LogLevels, logMessage } from '@util/logger'
import { syncWithURI } from '@database/connection'

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

// Connect to the database and listen for requests
syncWithURI(mongoDBUri).then((conn) => {
    if (!conn) {
        logMessage(
            LogLevels.ERROR,
            'failed to establish a database connection.',
        )
        exit(1)
    }

    logMessage(
        LogLevels.INFO,
        'successfully established a database connection.',
    )

    application.listen(port, () => {
        const address =
            environment == 'development'
                ? `${process.env.ADDRESS}:${port}`
                : `${process.env.ADDRESS}`

        logMessage(LogLevels.INFO, `application listening on port:${port}`)
        logMessage(LogLevels.INFO, `api live at - ${address}`)
    })
})
