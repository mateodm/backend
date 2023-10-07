import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import { ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"

const router = Router()


router.post("/ticket", passport_call("jwt"), async (req, res) => {
    console.log(req)
    console.log("hola")
})

export default router