import { Router } from "express";
import Products from "../../models/product.model.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import auth from "../../middlewares/devsAuth.js"
import passport_call from "../../middlewares/passport_call.js";
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct} from "../../controllers/product.controller.js"
const router = Router()


/* AÑADIR PRODUCTO */

router.get("/", auth, getProducts)
router.post("/post", createProduct)
router.get("/:pid" ,  passport_call("jwt"), getProductById)
router.delete("/:pid", deleteProduct)
router.put("/:pid", auth, updateProduct)
export default router