import ProductManager from "../repository/productmongo.js";
import CartManager from "../repository/cartmongo.js"
import TicketManager from "../repository/ticketmongo.js"

const productService = new ProductManager()
const cartService = new CartManager()
const ticketService = new TicketManager()

export {productService, cartService, ticketService};