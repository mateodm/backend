import { Router } from "express";
import ProductManager from "../../ProductManager.js"
import CartManager from "../../CartManager.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import cartAPI from "./cartAPI.js"
import productAPI from "./productAPI.js"

const router = Router()

router.use("/cart", cartAPI)
router.use("/products", productAPI)

export default router