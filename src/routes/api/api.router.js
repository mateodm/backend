import { Router } from "express";
import ProductManager from "../../managers/product.js"
import CartManager from "../../managers/cart.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import cartAPImongo from "./cartAPImongo.js"
import productAPImongo from "./productAPImongo.js"
import cookies from "./cookies.js"
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
export default router