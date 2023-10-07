import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import { ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"
import crypto from "crypto"
import config from "../../config/config.js";

const router = Router()


router.post("/ticket", async (req, res) => {
    console.log(req.headers)
    const body = req.body
    const signature = req.headers["x-signature"];
    const secretKey = config.mercadopagoKey
    const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(JSON.stringify(body))
    .digest("hex");
    if (signature === expectedSignature) {
        console.log("valido")
        console.log(body)
        return res.sendStatus(200)
    }
    else {
        return res.sendStatus(400)
    }
})

export default router