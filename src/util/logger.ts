import colors from 'colors/safe.js' // Node + Typescript still don't get this right.

export enum LogLevel {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERR',
}

export function logMessage(level: LogLevel, msg: string) {
    let coloredTag
    switch (level) {
        case LogLevel.INFO:
            coloredTag = colors.cyan(`[${level}]:`)
            break

        case LogLevel.SUCCESS:
            coloredTag = colors.green(`[${level}]:`)
            break

        case LogLevel.ERROR:
            coloredTag = colors.red(`[${level}]:`)
            break

        default:
            coloredTag = colors.grey(`[${level}]:`)
            break
    }
    console.log(coloredTag, msg)
}
