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
import expressSession from "express-session"
import sessionFileStore from "session-file-store"
import mongoStore from "connect-mongo"
import passport from "passport";
import inicializePassport from "./config/passport.js"

/* SERVER CONFIG */
const server = express()
server.use(cookieParser(process.env.COOKIE_NAME))
server.use(expressSession({
    store: mongoStore.create({
        mongoUrl: process.env.URL,ttl:10000
         }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))


/* HANDLERBARS */
server.engine("handlebars", engine({
    helpers: {
      ifEquals: function(arg1, arg2, options) {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
      }
    }
  }));

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
inicializePassport()
server.use(passport.initialize())
server.use(passport.session())

connect("mongodb+srv://ecommercemongoose:test@cluster0.a5r87to.mongodb.net/ecommerce")
    .then(() => console.log("mongoose connected"))
    .catch(err => console.log(err))

export default server;