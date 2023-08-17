import { Router } from "express";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import cartAPImongo from "./cartAPImongo.js"
import productAPImongo from "./productAPImongo.js"
import cookies from "./cookies.js"
import sendMail from "../../utils/mailer.js"
import generateProduct from "../../utils/mock.js"
import authentication from "./auth.router.js"
/* 
import cartAPI from "./cartAPI.js"
import productAPI from "./productAPI.js" 
*/


const router = Router()

router.use("/cart", cartAPImongo)
router.use("/products", productAPImongo)
router.use("/cookies", cookies)
router.use("/auth", authentication)
router.get("/mockproducts", async(req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    return res.json({product: products})
})
export default router