import { Router } from "express";
import check from "../../middlewares/check.js";
import passwordLength from "../../middlewares/password.js";
import createHash from "../../middlewares/createHash.js";
import validPassword from "../../middlewares/validPassword.js";
import devsAuth from "../../middlewares/devsAuth.js"
import passport_call from "../../middlewares/passport_call.js";
import passport from "passport";
import tokenGenerator from "../../middlewares/tokenGenerator.js";
import { resetpassword, forgotpassword, deleteUser, updateRole } from "../../controllers/user.controller.js";
import { login, register, signout } from "../../controllers/auth.controller.js"
import { es } from "@faker-js/faker";
import { userService } from "../../service/index.js";

const router = Router()

router.post("/register", check, passwordLength, createHash, passport.authenticate("register", { session: false, failureRedirect: "/api/auth/failed-register" }), register, async (req, res) => {

}
)
router.get("/failed-register", (req, res) => {
    res.status(401).json({ success: false, message: "Error auth" })
})

router.post("/login", passwordLength, passport.authenticate("signin", { session: false, failureRedirect: "api/auth/fail-signin" }), validPassword, tokenGenerator, login, async (req, res) => {

})
router.get('/fail-signin', (req, res) => res.status(400).json({
    success: false,
    message: 'sign in failed'
}))

router.get("/signout", signout, async (req, res) => {

})

router.post("/forgot-password", forgotpassword )
router.post("/reset-password", passwordLength, createHash, resetpassword )

router.put("/change-role/:id", passport_call("jwt"), devsAuth, updateRole)
router.delete("/delete-user/:id", passport_call("jwt"), devsAuth, deleteUser)

export default router