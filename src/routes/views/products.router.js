import { Router } from "express"
import ProductManager from "../../managers/product.js"
import Index from "../index.router.js"
import Products from "../../models/product.model.js";
import CartManager from "../../managers/cart.js";


let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
const router = Router()


/* PRODUCTS */
router.get("/", async (req, res) => {
    let load = true
        return res.render("products", {
            load
        })
        return res.send({
            success: true,
            status: 404,
        })
    })

router.get("/:pid", async(req, res) => {
/*     let id = req.params.pid
    console.log(id)
    let product = await Products.findById(id) */
        return res.render("product",{
            success: true,
        })
})


export default router