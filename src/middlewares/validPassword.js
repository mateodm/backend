import { compareSync } from "bcrypt"
import User from "../models/user.model.js"

export default async function validPassword(req, res, next) {
        let validate = compareSync(req.body.password, req.user.password) /* Compara lo enviado por el cliente con la de la DB de mongo */
        if(validate) {
            return next()
        }
        else {
            return res.status(401).json({ success: false, message:"Invalid mail or password"})
        }
    }