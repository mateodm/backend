/* IMPORTS */
import express, {query} from "express"
import "dotenv/config.js";
import logger from "morgan";
import router from "./routes/index.router.js"
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"
import { engine } from "express-handlebars"
import { __dirname, __filename } from "./utils.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

/* SERVER CONFIG */
const server = express()

/* HANDLERBARS */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

server.use(express.json());
server.use("/", router);
/* ACCEDER ARCHIVOS EN PUBLIC (ERROR ANTERIOR) */
server.use(express.static(`${__dirname}/public`));
server.use(express.urlencoded({extended:true}));

server.use(logger("dev"));

/* Error Handler */

server.use(errorHandler);
server.use(notFoundHandler)


export default server;