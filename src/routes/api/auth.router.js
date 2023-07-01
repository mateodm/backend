import { Router } from "express";
import User from "../../models/user.model.js"
import check from "../../middlewares/check.js";
import passwordLength from "../../middlewares/password.js";
const router = Router()


router.post("/register", check, passwordLength, async (req, res) => {
    try {
        const mail = req.body.mail
        const checkMail = await User.find().exec()
        let check = checkMail.find(check => check.mail === mail)
        if (!check) {
            User.create(req.body)
            return res.json({ success: true, status: 200 })
        }
        else {
            return res.json({ success: false, status: 400, message: "Email already exists" })
        }
    }
    catch (error) {
        return res.json({
            error: error,
            success: false,
            status: 400,
            message: "Params missing",
        })
    }
}
)

router.post("/login", passwordLength, async (req, res) => {
    try {
        const mail = req.body.mail
        const password = req.body.password
        const match = await User.find({ mail })
        if (match[0].password === password) {
            let role = match[0].role
            req.session.mail = mail
            req.session.role = role
            console.log(req.session)
            return res.json({ success: true, status: 200 })
        }
        else {
            return res.json({ success: false, status: 400})
        }
    }
    catch (error) {
        console.log(error)
    }
})
router.post("/signout", async (req, res) => {
    try {
        req.session.destroy()
    }
    catch (error) {
        next(error)
    }
})

export default router