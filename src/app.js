import express, {query} from "express"
import ProductManager from "./ProductManager.js"
let server = express()
let port = 8080
let manager = new ProductManager("./src/json/products.json");

let working = () => console.log("server ready on port " + port)

server.listen(port, working)
server.use(express.urlencoded({extended:true}))

let products_route = "/products"
let products_function = async (req, res) => {
    let products = await manager.getProducts()
    console.log(products)
    let quantityToSlice = req.query.limit ?? products.length
    let productsSlice = products.slice(0, quantityToSlice)
    return res.send({
        products
    })
}
let products_id_route = "/products/:pid"
let products_id_function = async (req, res) => {
    let id = Number(req.params.pid)
    console.log(id)
    let product = await manager.getProductByID(id)
    return res.send({
        product
    })
}
server.get(products_route, products_function)
server.get(products_id_route, products_id_function)

