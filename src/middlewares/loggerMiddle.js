import logger from "../config/loger.js"
export default function addLogger(req, res, next) {
    req.logger = logger
    req.logger.http(`${req.method} en la ruta ${req.url} en la fecha: ${new Date().toLocaleString()}`)
    next()
}
