import { Router } from "express";
import ProductManager from "../../managers/product.js"
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"

const router = Router()
let manager = new ProductManager("./src/json/products.json");

/* AÑADIR PRODUCTO */
router.post("/post", async (req, res) => {
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thumbnail = req.body.thumbnail ?? null
        let code = req.body.code ?? null
        let stock = req.body.stock ?? null
        if(title && description && price && thumbnail && code) {
            let product = await manager.addProduct(title, description, price, thumbnail, code, stock )
            return res.redirect("/products")
        }
        else {
            return res.json({
                success: false,
                status: 400,
                message: "Params missing"
            })
        }
})

export default router