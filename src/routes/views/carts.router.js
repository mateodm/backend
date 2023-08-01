import { Router } from "express"
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";
import passport_call from "../../middlewares/passport_call.js";
import jwt from "jsonwebtoken";


const router = Router()


router.get("/",  passport_call("jwt"), async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.render("cart", { role: decoded.role, mail: decoded.mail,})
})


export default router