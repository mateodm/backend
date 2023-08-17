import { Router } from "express";
import check from "../../middlewares/check.js";
import passwordLength from "../../middlewares/password.js";
import createHash from "../../middlewares/createHash.js";
import validPassword from "../../middlewares/validPassword.js";
import passport from "passport";
import tokenGenerator from "../../middlewares/tokenGenerator.js";
import { login, register, signout} from "../../controllers/auth.controller.js"

const router = Router()

router.post("/register", check, passwordLength, createHash, passport.authenticate("register", { failureRedirect: "/api/auth/failed-register" }), register , async (req, res) => {

}
)
router.get("/failed-register", (req, res) => {
    res.status(401).json({ success: false, message: "Error auth" })
})

router.post("/login", passwordLength, passport.authenticate("signin", {failureRedirect: "api/auth/fail-signin"}), validPassword, tokenGenerator, login, async (req, res) => {

})
router.get('/fail-signin', (req, res) => res.status(400).json({
    success: false,
    message: 'sign in failed'
}))

router.get("/signout", signout, async (req, res) => {

})

router.get("/github", passport.authenticate("github"), async (req, res) => {
    passport.authenticate("github", {scope: ["user:email"]}, (req, res) => {
    })
})
router.get("/github/callback", passport.authenticate("github", {failureRedirect: "/failed-register"}), async (req, res) =>  {
    return res.status(201).cookie('token',req.token,{maxAge:60*60*1000}).redirect('/')
})

router.get("/current", async (req, res, next) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if(decoded) {
        return decoded
    }
    else {
        return res.status(200).json({message: "Error to get the credentials"})
    }
} )

export default router