import { userService } from "../service/index.js";
import forgotMiddleware from "../middlewares/forgotMiddleware.js";
import sendMail from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";
class userController {
    async givePremium(req, res, next) {
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.findOne({ mail: decoded.mail })
        if (decoded.role === "user") {
            console.log(user._id)
            await userService.update(user._id, { role: "premium" })
            return res.status(200).clearCookie('token').redirect("/signin")
        }
        else {
            return res.json({ status: 404, message: "You are premium or admin" })
        }
    }
    async forgotpassword(req, res) {
        try {
            const email = { mail: req.body.mail };
            let user = await userService.findOne(email)
            if (user) {
                let token = await forgotMiddleware(email);
                if (token) {
                    let link = `http://localhost:8080/reset-password/${token}`
                    let message = `Reset your password here, the link expires in 1 hour: ${link}`;
                    await sendMail(req.body.mail, message);
                    return res.json({ status: 200, success: true})
                }
                else {
                    return CustomError.createError({ name: "Error", cause: ["Unknown error"], code: Errorss.INVALID_TYPE_ERROR })
                }
            }
            else {
                return res.json({ status: 200, success: true})
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async resetpassword(req, res) {
        try {
            const password = req.body.password
            if (req.cookies.rpass) {
                let rpass = req.cookies.rpass
                let decoded = jwt.verify(rpass, process.env.JWT_SECRET);
                let newPassword = { password: password }
                if (decoded) {
                    await userService.update("mail", decoded.mail, newPassword)
                    return res.clearCookie('rpass').json({success: true, message: "Password updated succesfully"})
                }
                else {
                    return CustomError.createError({ name: "TOKEN JWT not decoded", cause: ["Invalid token JWT"], code: Errorss.INVALID_TYPE_ERROR })
                }

            }
            else {
                return res.json({ status: 400, message: "Not authorized" })
            }
            userService.update()


        }
        catch (e) {
            console.log(e)
        }
    }
}

const { givePremium, forgotpassword, resetpassword } = new userController()

export { givePremium, forgotpassword, resetpassword }