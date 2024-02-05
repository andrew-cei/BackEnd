import { createLogger, format, transports } from "winston";

const { combine, colorize, simple } = format;

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    }
}
// Logger de desarrollo
const devLogger = createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console({level: 'debug'})
    ]
})
// Logger de producción
const prodLogger = createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console({level: 'info'}),
        new transports.File({filename: './errors.log',level: 'error'})
    ]
})

// Agregar devLogger como midleware
export const addDevLogger = (req, res, next) => {
    req.logger = devLogger;
    req.logger.http(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString}`);
    next();
}
// Agregar devLogger como midleware
export const addProdLogger = (req, res, next) => {
    req.logger = prodLogger;
    req.logger.http(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString}`);
    next();
}
