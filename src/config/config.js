import mongoose from "mongoose";
import MongoSingleton from "./singleton.js";
import dotenv from "dotenv"
import { commander } from "../utils/commander.js";

const {mode} = commander.opts()

/* dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
}); */

export default  {
    gmail_username: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    port: process.env.PORT || 8080,
    mongoUrl: process.env.URL,
    jwt_key: process.env.JWT_SECRET,
    cookie: process.env.COOKIE_NAME,
    secretSession: process.env.SECRET_SESSION,
    secretClient : process.env.SECRET_CLIENT,
    clientID: process.env.GITHUB_CLIENTID,
    persistence: process.env.PERSISTENCE,
    mercadopagoPublic: process.env.MP_PUBLIC,
    mercadopagoKey: process.env.MP_KEY,
    connectMDB: () => MongoSingleton.getInstance()
    
}