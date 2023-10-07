import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import passport from "../../config/passport.js";
import { ticketService } from "../../service/index.js";
import generateEmailContent from "../../utils/mailTemplate.js"
import sendMail from "../../utils/mailer.js"

const router = Router()


router.get("/ticket", passport_call("jwt"), async (req, res) => {
    const queryString = req._parsedOriginalUrl.query;
    const queryParams = new URLSearchParams(queryString);
    const mpSignature = queryParams.get('signature');
    console.log(req)
/*     console.log(mpSignature)
    queryParams.delete('signature');
    const orderedParams = Array.from(queryParams.keys()).sort().map(key => `${key}=${queryParams.get(key)}`).join('&');
    const calculatedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(orderedParams)
    .digest('hex');
    if (providedSignature === calculatedSignature) {
    
    } */

})

export default router