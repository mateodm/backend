import { Router } from "express";
import ProductManager from "../../ProductManager.js"
import CartManager from "../../CartManager.js";
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"


let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
const router = Router()

/* INDEX */
router.get("/", async (req, res) => {
    let cart = await cmanager.getCartByID(1)
    let length = cart.products
    return res.render("index",{ length: length})
})
/* CREAR PRODUCTO */
router.get("/new_product", async (req, res) => {
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
    

router.use("/products", productsRouter)
router.use("/cart", cartsRouter)

export default router