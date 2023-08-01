import { Router } from "express";
import ProductManager from "../../models/product.model.js"
import CartManager from "../../models/cart.model.js";
import jwt from "jsonwebtoken";
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import Products from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";
import auth  from "../../middlewares/devsAuth.js";
import session from "express-session"


const router = Router()

/* INDEX */
router.get("/", async (req, res) => {
  const token = req.cookies.token
  if(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let cart = await Cart.findById(decoded.cart)
    let length = cart.products.length
    return res.render("index",{ length: length, mail: decoded.mail, role: decoded.role})
  }
  else {
    return res.render("index",)
  }
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
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.render("newproduct",{ mail: decoded.mail, role: decoded.role})
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