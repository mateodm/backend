import jwt from "jsonwebtoken"
import {userService} from "../service/index.js"
export default async (req, res, next) => {
    if (req.mail) {
        const token = jwt.sign({ mail: req.mail }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});
        return token
    }   
    else {
        return res.status(400)
    }
}