import server from "./app.js"
import { Server } from "socket.io";
import CartManager from "./CartManager.js";
import { __dirname, __filename } from "./utils.js"
import ProductManager from "./ProductManager.js";

const PORT = process.env.PORT || 8080 /*  Si esta disponible el puerto 8080 utilizara el mismo, si no se usara otro. */
const chat = []
const ready = () => console.log("server ready on port " + PORT)
const http_server = server.listen(PORT, ready)
const socket_server = new Server(http_server)

socket_server.on("connection", (socket) => {
    socket.on("auth", () => {
        return null;
    })
    socket.on("nuevo_mensaje", data => {chat.push(data)
        socket_server.emit("allMessages", chat)
    })
    socket.on("length", async function()  {
        let cmanager = new CartManager("./src/json/carts.json")
        let cart = await cmanager.getCartByID(1)
        let info = cart.products
        socket_server.emit("cartLength", info.length)

    })
    socket.on("new_stock", async data => { 
    let manager = new ProductManager("./src/json/products.json")
    let product = await manager.getProductByID(data)
    socket.emit("change_stock", product)
    })
    socket.on("products", async function() {
        let manager = new ProductManager("./src/json/products.json")
        let products = await manager.getProducts()
        let productsSend = products.filter(product => product.stock !== 0)
            if(productsSend) {
                socket_server.emit("load_products", productsSend)
            }
    })
    socket.on("card", async function() {
        let cmanager = new CartManager("./src/json/carts.json")
        let manager = new ProductManager("./src/json/products.json")
        let cart = await cmanager.getCartByID(1)
        let products = cart.products
        let productsCart = []
        for (const product of products) {
            let productID = await manager.getProductByID(product.productID)
            let quantity = product.quantity
            let productFinal = {...productID, quantity: quantity};
            productsCart.push(productFinal)
        }
        socket.emit("card-cart", productsCart)
    })
    socket.on("product-find", async data => {
        const url = data;
        const parts = url.split("/");
        const lastNumber = parts[parts.length - 1];
        let manager = new ProductManager("./src/json/products.json")
        let product = await manager.getProductByID(Number(lastNumber))
        socket_server.emit("detail-product", product)

    })
})