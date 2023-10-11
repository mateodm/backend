/* IMPORTS */
import express, { query } from "express"
import { connect } from "mongoose"
import "dotenv/config.js";
import { addLogger } from './config/loger.js'
import router from "./routes/index.router.js"
import { engine } from "express-handlebars"
import { __dirname, __filename } from "./utils/utils.js"
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo"
import passport from "passport";
import inicializePassport from "./config/passport.js"
import config from "./config/config.js"
import errorMidleware from "./middlewares/errorMiddleware.js";
import {specs} from "./utils/swagger.js"
import swaggerUiExpress from "swagger-ui-express";
import mercadopago from "mercadopago"

mercadopago.configurations.setAccessToken(config.mercadopagoKey);

/* VARS CONFIG */
const cookiesName = config.cookie
const secretSession = config.secretSession
/* SERVER CONFIG */
const server = express()
server.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
server.use(cookieParser(cookiesName))


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

/* Error Handler */

server.use(addLogger);
server.use(errorMidleware)
server.use(notFoundHandler)
inicializePassport()
server.use(passport.initialize())

/* CONEXION CON MONGO DB*/
config.connectMDB()
export default server;