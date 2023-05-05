/* IMPORTS */
import express, {query} from "express"
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"

/* SERVER CONFIG */

let server = express()
let port = 8080
let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")

let working = () => console.log("server ready on port " + port)

server.listen(port, working)
server.use(express.urlencoded({extended:true}))

/* /* ENDPOINTS */

/* FUNCION PRODUCTOS */
let products_route = "/api/products"

let products_function = async (req, res) => {
    let products = await manager.getProducts()
    let quantityToSlice = req.query.limit ?? products.length
    let productsSlice = products.slice(0, quantityToSlice)
    if(quantityToSlice) {
        return res.send({
            success: true,
            productsSlice
        })
    }
        return res.send({
            success: true,
            products
        })
    }

let products_id_route = "/api/products/:pid"
let products_id_function = async (req, res) => {
    let id = Number(req.params.pid)
    let product = await manager.getProductByID(id)
    if(product) {
        return res.send({
            success: true,
            product
        })
    }
    else {
        return res.send({
            success: false,

        })
    }
}

/* FUNCION CARRITO */

let carts_route = "/api/carts"
let carts_function = async(req, res) => {
    let carts = await cmanager.getCarts()
    console.log(carts)
    if(carts) {
        return res.send({
            success: true,
            carts
        })
    }
    else {
        return res.send({
            success: false,
        })
    }
}
let carts_id_route = "/api/carts/:cid"
let carts_id_function = async (req, res) => {
    let id = Number(req.params.cid)
    let cart = await cmanager.getCartByID(id)
    if(cart) {
        return res.send({
            cart
        })
    }
    else {
        return res.send({
            success: false,
        })
    }
}

/* SERVER GETS */
server.get(products_route, products_function)
server.get(products_id_route, products_id_function)
server.get(carts_route, carts_function)
server.get(carts_id_route, carts_id_function)