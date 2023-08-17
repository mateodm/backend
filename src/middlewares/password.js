import Errorss from "../service/error/errors.js"
import CustomError from "../utils/customError.js"

export default function passwordLength (req, res, next) {
    try {
    const password = req.body.password
    if (password.length > 8) {
        next()
    }
    else {
        CustomError.createError({name: "Password less than 8 characters", cause: "Password need more or equally 8 characters", code: Errors.INVALID_TYPE_ERROR })
    }
    }
    catch(e) {
        next(e)
    }
}