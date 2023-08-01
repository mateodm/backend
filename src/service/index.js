import ProductManager from "../dao/productmongo.js";
import CartManager from "../dao/cartmongo.js"

const productService = new ProductManager()
const cartService = new CartManager()

export {productService, cartService};