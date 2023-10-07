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
    if (signature === expectedSignature) {
        console.log("aprobo:", req.body)
        const ticketBody = { code: "123", amount: "2", product: "a product", purcharser: "yo" };
        await ticketService.create(ticketBody);
    }
    else {
        console.log("fallo")
        return res.sendStatus(400)
    }
})

export default router