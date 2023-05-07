import fs from "fs"
import ProductManager from "./ProductManager.js"

const pManager = new ProductManager("./src/json/products.json")

export default class CartManager {
    #path;
    constructor(path) {
        this.#path = path
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
            return undefined
        }
    }
    async idGenerator(carts, cart) {
        if (carts.length === 0) {
            return cart.id
        }

        else {
            cart.id = carts[carts.length - 1].id + 1;
            return cart.id
        };
    }
    async addProduct( cid, pid, quantity) {
        const carts = await this.getCarts()
        const getProductByID = await pManager.getProductByID(pid)
        const cart = await this.getCartByID(cid)
        let check = cart.products.find(c => c.productID === pid)
        if (getProductByID) {
            let newStock = getProductByID.stock - quantity
                if ( pid === getProductByID.id && newStock >= 0 && cart && !check) {
                    await pManager.updateProduct(pid, "stock", newStock)
                    carts.forEach((carts) => {
                        if(cid === carts.id && !check) {
                            carts.products.push({ productID: pid, quantity: quantity})
                        }
                })
                await fs.promises.writeFile(this.#path, JSON.stringify(carts))
                return (`the product(${pid}) with ${quantity} units has been added succesfully`)
            }
            else if (Math.sign(newStock) === -1) {
                return (`you have ordered more quantity than we have in stock (${getProductByID.stock}), please try again with a correct quantity.`)
            }
        }
        else {
            return ("product or cart not found")
        }
    }
        async deleteProduct(cid, pid) {
            let carts = await this.getCarts()
            let check = await this.getCartByID(cid)
            if(check) {
                /* CANTIDAD */
                let products = check.products
                let product = await pManager.getProductByID(pid)
                let quantity = products.find(product => product.productID === pid)
                let newStock = product.stock + quantity.quantity
                await pManager.updateProduct(pid, "stock", newStock)
                /* FILTRO */
                let filter = products.filter(product => product.productID !== pid)
                const deleteProduct = carts.map((carts) => carts.id === cid ? { ...carts, products: filter} : carts)
                await fs.promises.writeFile(this.#path, JSON.stringify(deleteProduct))
            }
            else {
                return false
            }
        }
        async deleteCart(cid) {
            let carts = await this.getCarts()
            let check = await carts.find((c => c.id === cid))
            let newCarts = await carts.filter((c) =>  c.id !== cid)
            if(check) {
                carts.push(newCarts)
                await fs.promises.writeFile(this.#path, JSON.stringify(newCarts))
                return true
            }
            else {
                return false
            }
            
        }
}
