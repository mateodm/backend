export default class CustomError {
    static createError({name, cause, message, code}) {
        let error = new Error(message, {cause})
        error.name = name
        error.message = message
        error.cause = cause
        error.code = code
        throw error
    }
}