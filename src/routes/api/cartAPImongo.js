import { Router } from "express";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import Products from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";
import { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart} from "../../controllers/cart.controller.js"
import auth from "../../middlewares/devsAuth.js";
import passport_call from "../../middlewares/passport_call.js";


const router = Router()

/* CARTS */

router.get("/",  passport_call("jwt"), getCarts)
router.get("/:cid",  passport_call("jwt"), getCartById)
router.post("/", auth, createCart)
router.put("/:cid/products/:pid", passport_call("jwt"), updateCart)
router.put("/:cid/products/:pid/:quantity/add",  passport_call("jwt"),addUnit )
router.put("/:cid/products/:pid/:quantity/subtract",  passport_call("jwt"), substractUnit)
router.delete("/:cid/products/:pid",  passport_call("jwt"), deleteCart)
router.get("/bills/:cid",  passport_call("jwt"), totalAmount)

export default router