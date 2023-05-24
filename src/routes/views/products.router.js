import { Router } from "express"
import ProductManager from "../../ProductManager.js"
import Index from "../index.router.js"
import CartManager from "../../CartManager.js";


let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
const router = Router()


/* PRODUCTS */
router.get("/", async (req, res) => {
    let cart = await cmanager.getCartByID(1)
    let length = cart.products
    const products = await manager.getProducts()
    console.log(products)
    return res.render("products", {
        products: products,
        length: length,
    })
})
router.get("/:pid", async(req, res) => {
    let cart = await cmanager.getCartByID(1)
    let length = cart.products
    let id = Number(req.params.pid)
    let product = await manager.getProductByID(id)
    if(product) {
        return res.render("product",{
            product: product,
            length: length,
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