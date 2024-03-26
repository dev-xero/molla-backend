export enum LogLevels {
    INFO = "INFO",
    ERROR = "ERR"
}

export const logMessage = (level: LogLevels, msg: string) => {
    console.log(`[${level}]: ${msg}`)
}