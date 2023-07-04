import { hashSync, genSaltSync, genSalt } from "bcrypt";

export default function createHash(req, res, next) {
    const password = req.body.password
    const hashP = hashSync(password, genSaltSync()) /* Indicar primero la const a hashear y despues genSaltSync para indicar nivel de seguridad */
    req.body.password = hashP
    return next()
}