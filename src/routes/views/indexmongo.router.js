import { Router } from "express";
import ProductManager from "../../models/product.model.js"
import CartManager from "../../models/cart.model.js";
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import Products from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";



const router = Router()

/* INDEX */
router.get("/", async (req, res) => {
    let cart = await Cart.findById("648a4845503272604ff415cd")
    let length = cart.products.length
    return res.render("index",{ length: length})
})
/* CREAR PRODUCTO */
/* router.get("/new_product", async (req, res) => {
    let cart = await cmanager.getCartByID(1)
    let length = cart.products
    return res.render("newproduct",{ length: length})
})
router.get("/chat", async (req, res, next) => {
    try {
        return res.render("chat", {
          script: "chat.js",
        });
      } catch (error) {
        next(error);
      }
    });
     */

router.use("/products", productsRouter)
router.use("/cart", cartsRouter)

export default router