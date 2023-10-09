import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import {  productService, cartService, ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"
import config from "../../config/config.js";
import mp from "mercadopago"

const router = Router()


router.post("/ticket", async (req, res) => {
    const body = req.body.data
    let id = body.id
    let paymentID = await mp.payment.get(id)
    console.log(paymentID)
    const preferenceId = paymentID.body.external_preference;
    let ticket = await ticketService.getBy({code: preferenceId})
    console.log(ticket)
})

export default router