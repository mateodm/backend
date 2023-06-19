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
    let cart = await Cart.findById("6490cf8ae17a7f96df15d3f4")
    let length = cart.products.length
    return res.render("index",{ length: length})
})
/* CREAR PRODUCTO */
 router.get("/new_product", async (req, res) => {
    let cart = await Cart.findById("6490cf8ae17a7f96df15d3f4")
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

router.use("/products", productsRouter)
router.use("/cart", cartsRouter)

export default router