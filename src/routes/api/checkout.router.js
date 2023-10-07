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
    console.log(secretKey)
    .createHmac("sha256", secretKey)
    .update(JSON.stringify(body))
    .digest("hex");
    console.log(expectedSignature)
    console.log("Firma recibida:", signature)
    console.log("hola", req.body)
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