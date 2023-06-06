import { Router } from "express"
import ProductManager from "../../ProductManager.js"
import Index from "../index.router.js"
import CartManager from "../../CartManager.js";


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
    let id = Number(req.params.pid)
    let product = await manager.getProductByID(id)
    if(product) {
        return res.render("product",{
            success: true,
        })
    }
    else {
        return res.send({
            success: false,
            status: 404,

        })
    }
})


export default router