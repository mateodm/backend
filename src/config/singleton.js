import mongoose from "mongoose";

class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect("mongodb+srv://ecommercemongoose:test@cluster0.a5r87to.mongodb.net/ecommerce", {
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