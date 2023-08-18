import server from "./app.js"
import { Server } from "socket.io";
import Products from "./models/product.model.js";
import Cart from "./models/cart.model.js";
import jwt from "jsonwebtoken";
import config from "./config/config.js"
import {logger} from "./config/loger.js"



const PORT = config.port  /*  Si esta disponible el puerto 8080 utilizara el mismo, si no se usara otro. */
const chat = []
const ready = () => logger.info("Server ready in port " + PORT )
const http_server = server.listen(PORT, ready)
const socket_server = new Server(http_server)

socket_server.on("connection", (socket) => {
    const cookies  = socket.handshake.query.cookies;
    if(cookies) {    const token = cookies.match(/token=([^;]+)/)[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let cid = decoded.cart
    let mail = decoded.mail
    socket.on("auth", () => {
        return null;
    })
    socket.on("nuevo_mensaje", data => {
        chat.push(data)
        socket_server.emit("allMessages", chat)
    })
    socket.on("length", async function () {
        let cart = await Cart.findById(cid)
        let length = cart.products.length
        socket.emit("cartLength", length )

    })
    socket.on("totalamount", async data => {
        let amount = 0
        let cartID = await Cart.findById(cid).populate({
            path: "products", populate: { path: "product", model: "products" }
        })
        let cartProducts = cartID.products
        cartProducts.forEach(product => {
            let price = Number(product.product.price) * product.quantity
            amount = amount + price
        })
        socket.emit("amount", amount, cid, mail)
    })
    socket.on("new_stock", async data => {
        let product = await Products.findById(data)
        socket.emit("change_stock", product)
    })
    socket.on("card", async function () {
        try {
            const cart = await Cart.findById(cid).populate({
                path: "products",
                populate: { path: "product", model: "products", options: { sort: { title: 1 } } }
            })
            let products = cart.products
            socket.emit("card-cart", products, cid)
        } catch (error) {
            console.error(error);
        }
    })
    socket.on("product-find", async (data) => {
        try {
            const url = data;
            const parts = url.split("/");
            const lastNumber = parts[parts.length - 1];
            let product = await Products.findById(lastNumber).exec();
            socket_server.emit("detail-product", product, cid);
        }
        catch (error) {
        }
    })
    }
    else {
        return
    }
})