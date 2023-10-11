import mongoose from "mongoose";
import config from "./config.js";

class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true, useUnifiedTopology: true, })
    }
    static getInstance(){
        if(this.#instance){
            console.log('You already connect')
            return this.#instance

        }
        this.#instance = new MongoSingleton()
        console.log('connected!!')
        return this.#instance
    }
}

export default MongoSingleton