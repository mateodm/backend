import { Router } from "express";
import User from "../../models/user.model.js"
import check from "../../middlewares/check.js";
import passwordLength from "../../middlewares/password.js";
import createHash from "../../middlewares/createHash.js";
import validPassword from "../../middlewares/validPassword.js";
import passport from "passport";

const router = Router()

router.post("/register", check, passwordLength, createHash, passport.authenticate("register", { failureRedirect: "/api/auth/failed-register" }), async (req, res) => {
    try {
        return res.json({ success: true, status: 200 })
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
router.get("/failed-register", (req, res) => {
    res.status(401).json({ success: false, message: "Error auth" })
})

router.post("/login", passwordLength, passport.authenticate("signin", {failureRedirect: "api/auth/fail-signin"}), validPassword, async (req, res) => {
    try {
        const mail = req.body.mail
        req.session.mail = mail
        req.session.role = req.user.role
        return res.json({ success: true, status: 200 })
    }
    catch (error) {
        return res.json({ success: false, status: 400, message: error })
    }
})
router.get('/fail-signin', (req, res) => res.status(400).json({
    success: false,
    message: 'sign in failed'
}))

router.get("/signout", async (req, res) => {
    try {
        req.session.destroy()
        return res.status(200).redirect("/")
    }
    catch (error) {
        next(error)
    }
})

router.get("/github", passport.authenticate("github"), async (req, res) => {
    passport.authenticate("github", {scope: ["user:email"]}, (req, res) => {
    })
})
router.get("/github/callback", passport.authenticate("github", {failureRedirect: "/failed-register"}), async (req, res) =>  {
    req.session.mail = req.user.mail
    req.session.role = req.user.role
    return res.status(201).redirect('/')
})
export default router