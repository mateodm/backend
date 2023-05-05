import fs from "fs"
import ProductManager from "./ProductManager.js"

const pManager = new ProductManager("./src/json/products.json")

export default class CartManager {
    #path;
    constructor(path) {
        this.#path = path
    }
    async addProductInACart( cid, pid, quantity) {
        const getProductByID = await pManager.getProductByID(pid)
        const cart = await this.getCartByID(cid)
        let carts = await this.getCarts()
        if (pid === getProductByID.id && cid === cart.id ) {
            carts.forEach((carts) => {
                    if(cid === carts.id) {
                        carts.products.push({ productID: cid, quantity: quantity})
                    }
            })
            await fs.promises.writeFile(this.#path, JSON.stringify(carts))
        }
        else {
            console.log("Product not found or cart not found")
        }
        }
    async addCart() {
        const newCart = {
            id:  0,
            products: [],
        }
        const carts = await this.getCarts()
        await this.idGenerator(carts, newCart)
        carts.push(newCart)
        await fs.promises.writeFile(this.#path, JSON.stringify(carts))
    }
    async getCarts() {
        try {
        const cartsArray = await fs.promises.readFile(this.#path, "utf-8");
        return JSON.parse(cartsArray)
        }
        catch (e){
            return []
        }
    }
    async getCartByID(id) {
        let cart = await this.getCarts()
        let result = cart.find((c) => c.id === id)
        if (result) {
            return result
        }
        else {
            return
        }

    } 
    async idGenerator(carts, cart) {
        if (carts.length === 0) {
            return cart.id = 1;
        }

        else {
            return cart.id = carts.length + 1;
        };
    } 
}
