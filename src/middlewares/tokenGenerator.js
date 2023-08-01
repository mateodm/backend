import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export default async (req, res, next) => {
    let user = await User.findOne(req.mail)
    let token = jwt.sign( {mail: req.body.mail, role: req.user.role, cart: req.user.cart}, process.env.JWT_SECRET, { expiresIn: 60*60*24*7})
    req.token = token
    return next()
}