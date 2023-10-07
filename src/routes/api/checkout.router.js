import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import {  productService, cartService, ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"
import crypto from "crypto"
import config from "../../config/config.js";

const router = Router()


router.post("/ticket", async (req, res) => {
    const body = req.body
    const signature = req.headers["x-signature"];
    const secretKey = config.mercadopagoKey
    const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(JSON.stringify(body))
    .digest("hex");
    if (signature === expectedSignature) {
        let amount = 0
        let code = 0;
        const tickets = await ticketService.getTickets();
        if (tickets.length > 0) {
            code = Math.max(...tickets.map(ticket => Number(ticket.code))) + 1;
            const body = { code: "123", amount: "2", product: "a product", purcharser: "yo" };
            await ticketService.create(body);
        }
    }
    else {
        console.log("fallo")
        return res.sendStatus(400)
    }
})

export default router