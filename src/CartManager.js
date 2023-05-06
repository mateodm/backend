import fs from "fs"
import ProductManager from "./ProductManager.js"

const pManager = new ProductManager("./src/json/products.json")

export default class CartManager {
    #path;
    constructor(path) {
        this.#path = path
    }
    async addProduct( cid, pid, quantity) {
        const getProductByID = await pManager.getProductByID(pid)
        const cart = await this.getCartByID(cid)
        let carts = await this.getCarts()
        let newStock = getProductByID.stock - quantity
        if (pid === getProductByID.id && cid === cart.id && newStock >= 0) {
            await pManager.updateProduct(pid, "stock", newStock)
            carts.forEach((carts) => {
                    if(cid === carts.id) {
                        carts.products.push({ productID: pid, quantity: quantity})
                    }
            })
            await fs.promises.writeFile(this.#path, JSON.stringify(carts))
            return (`the product(${pid}) with ${quantity} units has been added succesfully`)
        }
        else if (Math.sign(newStock) === -1) {
            return (`you have ordered more quantity than we have in stock (${getProductByID.stock}), please try again with a correct quantity.`)
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
        return carts
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
    async deleteProduct(cid, pid) {
        let carts = await this.getCarts()
        let cart = carts.find(c => c.id === cid)
        let cartObjetive = cart.products
        let filter = cartObjetive.filter((c) => c.ProductID !== pid)
        await fs.promises.writeFile(this.#path, JSON.stringify(filter))
/*         cartObjetive.map((c) => c.id === pid ? cartObjetive.slice() : c) */
    } 
}
