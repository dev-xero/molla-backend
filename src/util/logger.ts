import colors from 'colors/safe.js' // Node + Typescript still don't get this right.

export enum LogLevel {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERR',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(level: LogLevel, msg: any) {
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
