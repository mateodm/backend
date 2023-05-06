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
server.use(express.json())

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
            status: 202,
            productsSlice
        })
    }
        return res.send({
            success: true,
            status: 404,
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
            status: 202,
            product
        })
    }
    else {
        return res.send({
            success: false,
            status: 404,

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
            status: 202,
            carts
        })
    }
    else {
        return res.send({
            status: 404,
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
            success: true,
            cart
        })
    }
    else {
        return res.send({
            success: false,
        })
    }
}
/* PRODUCTS */

/* SERVER GETS */
server.get(products_route, products_function)
server.get(products_id_route, products_id_function)

/* SERVER POSTS */
server.post("/api/products", async (req, res) => {
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thumbnail = req.body.thumbnail ?? null
        let code = req.body.code ?? null
        let stock = req.body.stock ?? null
        if(title && description && price && thumbnail && code) {
            let product = await manager.addProduct(title, description, price, thumbnail, code, stock )
            return res.json({
                status: 201,
                id: product.id,
                success: true,
            })
        }
        else {
            return res.json({
                success: false,
                status: 400,
                message: "Params missing"
            })
        }
    }
)

/* SERVER PUTS */
server.put("/api/products/:pid", async (req, res) => {
        let id = Number(req.params.pid) 
        let selectedParameter = req.body.selectedParameter ?? null
        let dataToUpdate = req.body.dataToUpdate ?? null
        if (id, selectedParameter, dataToUpdate) {
            let replace = await manager.updateProduct(id, selectedParameter, dataToUpdate)
            return res.json({
                success: true,
                status: 200,
                result: `replaced ${selectedParameter} to "${dataToUpdate}"`,
            })
        }
        else {
            return res.json({
                success: false,
                status: 400,
                message: ("Params missing")
            })
        }
    }
)
/* SERVER DELETE */
server.delete("/api/products/:pid", async (req,res) => {
    let id = Number(req.params.pid)
    if (id) {
        await manager.deleteProduct(id)
        return res.json({
            success: true,
            status: 200,
            result: (`the product with ID(${id}) has removed succesfully `),
        })
    }
    else {
        return res.json({
            status: 404,
            success: false,
            message: "missing params"
        })
    }
})

/* CARTS */
/* SERVER POSTS */
server.post("/api/carts", async (req, res) => {
    let addCart = await cmanager.addCart()
    if(addCart) {
        return res.json({
            success: true,
            status: 201,
            id: addCart.id,
        })
     }
    else {
        return res.json({
            success: false,
            status: 400,
            message: "error"
        })
    }
})

/* SERVER GETS */

server.get(carts_route, carts_function)
server.get(carts_id_route, carts_id_function)

/* SERVER PUTS */
server.put("/api/carts/:cid/products/:pid", async (req, res) => {
    let cid = Number(req.params.cid)
    let pid = Number(req.params.pid)
    let quantity = req.body.quantity
    if (cid && pid) {
        let addProduct = await cmanager.addProduct(cid, pid, quantity)
        return res.json({
            success: true,
            status: 200,
            message: addProduct,
        })
    }
    else {
        return res.json({
            success: false,
            status: 404,
            result: "missing params"
        })
    }
})
/* SERVER DELETE */
server.delete("/api/carts/:cid/products/:pid", async (req, res) => {
    let cid = Number(req.params.cid)
    let pid = Number(req.params.pid)
    let deleteProduct = await cmanager.deleteProduct(cid, pid)
    if(deleteproduct) {
        return res.json({
            success: true,
            status: 200,
            result: (`product (${pid}) remove succesfully`),
        })
    }
    else {
        return res.json({
            success: false,
            status: 404,
            message: ("missing params")
        })
    }
})