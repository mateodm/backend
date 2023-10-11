import { Router } from "express";
import jwt from "jsonwebtoken";
import auth from "../../middlewares/devsAuth.js";
import passport_call from "../../middlewares/passport_call.js";
import productsRouter from "./products.router.js"
import createCookie from "../../middlewares/cookiecreator.js";
import cartsRouter from "./carts.router.js"
import { productService, cartService, ticketService, userService } from "../../service/index.js";
import Cart from "../../models/cart.model.js";

const router = Router()

/* INDEX */
router.get("/", async (req, res) => {
  const token = req.cookies.token
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let cart = await Cart.findById(decoded.cart)
    let length = cart.products.length
    return res.render("index", { length: length, mail: decoded.mail, role: decoded.role })
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
router.get("/new_product", async (req, res) => {
  const token = req.cookies.token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role === "admin" || decoded.role === "premium") {
    return res.render("newproduct", { mail: decoded.mail, role: decoded.role })
  }
  else {
    return res.status(404).redirect("/")
  }
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

router.get("/forgot-password", async (req, res, next) => {
  return res.render("forgotpassword")
})
router.get("/reset-password/:token", async (req, res) => {
  if (req.cookies.rpass && req.cookies.rpass !== "sweetalert2.min.css") {
    return res.render("resetpassword")
  }
  else if (req.params.token) {
    res.clearCookie("rpass")
    let token = req.params.token
    let oneDay = 24 * 60 * 60 * 1000;
    res.cookie("rpass", token, { maxAge: oneDay, httpOnly: true });
    let { rpass } = req.cookies
    return res.render("resetpassword")
  }
  else {
    return res.status(404).redirect("/")
  }
})
router.get("/users", passport_call("jwt"), auth, async (req, res) => {
  const token = req.cookies.token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let allUsers = await userService.getUsers()
  let currentlyUsers = []
  allUsers.map(users => {
    if (users.role !== "admin") {
      currentlyUsers.push(users)
    }
  })
  return res.render("userManager", {
    users: currentlyUsers, mail: decoded.mail, role: decoded.role
  })
}
)
router.get("/tickets", passport_call("jwt"), auth, async(req, res) => {
  const token = req.cookies.token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tickets = await ticketService.getTickets()
  return res.render("ticketsView", {
    tickets: tickets, mail: decoded.mail, role: decoded.role
  })
})
router.use("/products", productsRouter)
router.use("/cart", cartsRouter)

export default router