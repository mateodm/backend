import mongoose from "mongoose";
import dotenv from "dotenv"
import { commander } from "../utils/commander.js";

const {mode} = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

export default  {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.URL,
    jwt_key: process.env.JWT_SECRET,
    cookie: process.env.COOKIE_NAME,
    secretSession: process.env.SECRET_SESSION,
    secretClient : process.env.SECRET_CLIENT,
    clientID: process.env.GITHUB_CLIENTID,
    connectMDB: async () => {
        try {
            await mongoose.connect(process.env.URL)
        }
        catch(error) {
            console.log(error)
        }
    }
    
}