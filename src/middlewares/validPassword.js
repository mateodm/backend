import { compareSync } from "bcrypt"
import Errorss from "../service/error/errors.js"
import CustomError from "../utils/customError.js"
import User from "../models/user.model.js"

export default async function validPassword(req, res, next) {
    try {
        let validate = compareSync(req.body.password, req.user.password) /* Compara lo enviado por el cliente con la de la DB de mongo */
        if(validate) {
            return next()
        }
        else {
            CustomError.createError({name: "Fail login", message: "Invalid username of password", cause: "Invalid username or password provided", code: Errorss.INVALID_TYPE_ERROR})
        }
    }
    catch(e) {
        next(e)
    }
    }