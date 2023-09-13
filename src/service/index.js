import ProductManager from "../repository/productmongo.js";
import CartManager from "../repository/cartmongo.js"
import TicketManager from "../repository/ticketmongo.js"
import UserManager from "../repository/usermongo.js"

const productService = new ProductManager()
const cartService = new CartManager()
const ticketService = new TicketManager()
const userService = new UserManager()
export {productService, cartService, ticketService, userService};