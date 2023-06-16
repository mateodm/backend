import server from "./app.js"
import { Server } from "socket.io";
import CartManager from "./managers/cart.js";
import { __dirname, __filename } from "./utils.js"
import ProductManager from "./managers/product.js";
import Products from "./models/product.model.js";
import Cart from "./models/cart.model.js";


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
/*      let cmanager = new CartManager("./src/json/carts.json")
        let cart = await cmanager.getCartByID(1) */
        let cart = await Cart.findById("648a4845503272604ff415cd")
        let info = cart.products
        socket_server.emit("cartLength", info.length)

    })
    socket.on("new_stock", async data => { 
/*     let manager = new ProductManager("./src/json/products.json")
    let product = await manager.getProductByID(data) */
    let product = await Products.findById(data)
    socket.emit("change_stock", product)
    })
    socket.on("products", async function() {
/*      let manager = new ProductManager("./src/json/products.json")
        let products = await manager.getProducts() */
        let products = await Products.find().exec()
        let productsSend = products.filter(product => product.stock !== 0)
            if(productsSend) {
                socket_server.emit("load_products", productsSend)
            }
    })
    socket.on("card", async function() {
/*      let cmanager = new CartManager("./src/json/carts.json")
        let manager = new ProductManager("./src/json/products.json")
        let cart = await cmanager.getCartByID(1) */
        let cart = await Cart.findById("648a4845503272604ff415cd")
        let products = cart.products
        let productsCart = []
        for (const product of products) {
            try {
                const productID = await Products.findById(product.pid);
                if (!productID) {
                    continue;
                }
                const quantity = product.quantity;
                const productFinal = {
                    ...productID.toObject(),
                    quantity: quantity
                };
                productsCart.push(productFinal);
            } catch (error) {
                console.error(error);
            }
        }
        socket.emit("card-cart", productsCart)
    })
    socket.on("product-find", async (data) => {
        try {
            const url = data;
            const parts = url.split("/");
            const lastNumber = parts[parts.length - 1];   
            let product = await Products.findById(lastNumber).exec(); 
            socket_server.emit("detail-product", product); 
        }
        catch(error) {
        }
    })
})