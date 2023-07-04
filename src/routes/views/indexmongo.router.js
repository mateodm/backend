import { Router } from "express";
import ProductManager from "../../models/product.model.js"
import CartManager from "../../models/cart.model.js";
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import Products from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";
import auth  from "../../middlewares/devsAuth.js";
import userAuth from "../../middlewares/userAuth.js";
import session from "express-session"



const router = Router()

/* INDEX */
router.get("/", async (req, res) => {
    let cart = await Cart.findById("6490cf8ae17a7f96df15d3f4")
    let length = cart.products.length
    let admin = 1
    return res.render("index",{ length: length, session: req.session, admin: admin})
})
/* REGISTER */
router.get("/register", (req, res) => {
  return res.render("userRegister")
})
router.get("/signin", (req, res) => {
  return res.render("login")
})
/* CREAR PRODUCTO */
 router.get("/new_product", auth, async (req, res) => {
    let admin = 1
    let cart = await Cart.findById("6490cf8ae17a7f96df15d3f4")
    let length = cart.products
    return res.render("newproduct",{ length: length, session: req.session, admin: admin})
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