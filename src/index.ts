import { authRouter } from '@route/auth.route'
import cors, { CorsOptions } from 'cors'
import env from '@config/env'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { LogLevel, log } from '@util/logger'
import { exit } from 'process'
import productModel from '@model/product'
import { productRouter } from '@route/products.route'
import { seedDatabase } from '@database/seeder'
import { sendJsonResponse } from '@util/response'
import { syncWithURI } from '@database/connection'
import rateLimit from 'express-rate-limit'

const port = env.port
const environment = env.environment
const mongoDBUri = env.mongodb_uri

const application = express()
const corsOptions: CorsOptions = {
    origin: [
        'http://localhost:3456',
        'http://localhost:5173',
        'http://localhost:3000',
        'https://molla-frontend.vercel.app',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 mins
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Rate limit exceeded, try again later.",
        success: false,
        code: 429,
        payload: null
    }
})

// Enable JSON middleware and url encoding
application.use(express.json())
application.use(express.urlencoded({ extended: true }))

// Enable cors, set secure headers
application.use(cors(corsOptions))
application.use(helmet())

// Use request logger
application.use(morgan('tiny'))

// Register routers
application.use('/auth', limiter, authRouter)
application.use('/products', limiter, productRouter)

application.get('/', (_, res) => {
    sendJsonResponse(
        {
            message: "Welcome to Molla's backend API.",
            code: 200,
            payload: null,
        },
        res,
    )
    return
})

application.use((_, res) => {
    sendJsonResponse(
        {
            message: 'Undefined endpoint accessed.',
            code: 404,
            payload: null,
        },
        res,
    )
    return
})

// Connect to the database and listen for requests
syncWithURI(mongoDBUri).then((conn) => {
    if (!conn) {
        log(LogLevel.ERROR, 'failed to establish a database connection.')
        exit(1)
    }

    log(LogLevel.INFO, 'successfully established a database connection.')

    seedDatabase(productModel, (err, success) => {
        if (err || !success) {
            log(LogLevel.ERROR, 'could not seed database.')
            exit(1)
        }
        log(LogLevel.SUCCESS, 'successfully seeded the database.')
    })

    application.listen(port, () => {
        const address =
            environment == 'development'
                ? `${process.env.ADDRESS}:${port}`
                : `${process.env.ADDRESS}`

        log(LogLevel.INFO, `application listening on port:${port}`)
        log(LogLevel.INFO, `api live at - ${address}`)
    })
})
