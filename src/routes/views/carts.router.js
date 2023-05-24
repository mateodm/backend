import { Router } from "express"
import ProductManager from "../../ProductManager.js"
import CartManager from "../../CartManager.js";
let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
const router = Router()


router.get("/", async (req, res) => {
    let cart = await cmanager.getCartByID(1)
    let products = cart.products
    let productsCart = []
    for (const product of products) {
        let productID = await manager.getProductByID(product.productID)
        let quantity = product.quantity
        let productFinal = {...productID, quantity: quantity};
        productsCart.push(productFinal)
    }
    return res.render("cart", { products: productsCart,})
})


export default router