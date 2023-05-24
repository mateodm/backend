/* IMPORTS */
import express, {query} from "express"
import router from "./routes/index.router.js"
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"
import { engine } from "express-handlebars"
import { __dirname, __filename } from "./utils.js"

/* SERVER CONFIG */

let server = express()
let port = 8080
let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
let working = () => console.log("server ready on port " + port)
/* HANDLERBARS */
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/views")

server.listen(port, working)
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use("/", router)
