/* IMPORTS */
import express, { query } from "express"
import { connect } from "mongoose"
import "dotenv/config.js";
import logger from "morgan";
import router from "./routes/index.router.js"
import ProductManager from "./managers/product.js"
import CartManager from "./managers/cart.js"
import { engine } from "express-handlebars"
import { __dirname, __filename } from "./utils.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cookieParser from "cookie-parser";

/* SERVER CONFIG */
const server = express()
server.use(cookieParser(process.env.COOKIE_NAME))
/* HANDLERBARS */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

server.use(express.json());
server.use("/", router);
/* ACCEDER ARCHIVOS EN PUBLIC (ERROR ANTERIOR) */
server.use("", express.static('public'));
/* server.use(express.static(`${__dirname}/public`)); */
server.use(express.urlencoded({ extended: true }));
server.use(logger("dev"));

/* Error Handler */

server.use(errorHandler);
server.use(notFoundHandler)

connect("mongodb+srv://ecommercemongoose:test@cluster0.a5r87to.mongodb.net/ecommerce")
    .then(() => console.log("mongoose connected"))
    .catch(err => console.log(err))

export default server;