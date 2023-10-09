import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import {  productService, cartService, ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"
import config from "../../config/config.js";

const router = Router()


router.post("/ticket", async (req, res) => {
    const body = req.body
    console.log(req.body)
})

export default router