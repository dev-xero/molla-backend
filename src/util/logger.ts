import colors from 'colors/safe'

export enum LogLevels {
    INFO = 'INFO',
    ERROR = 'ERR',
}

export const logMessage = (level: LogLevels, msg: string) => {
    let coloredTag
    switch (level) {
        case LogLevels.INFO:
            coloredTag = colors.cyan(`[${level}]:`)
            break

        case LogLevels.ERROR:
            coloredTag = colors.red(`[${level}]:`)
            break

        default:
            coloredTag = colors.grey(`[${level}]:`)
            break
    }
    console.log(coloredTag, msg)
}
