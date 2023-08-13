

import Products from "../models/product.model.js";
import Cart from "../models/cart.model.js"
import { productService, cartService, ticketService } from "../service/index.js"
import Ticket from "../models/ticket.model.js";
class CartController {
    async getCarts(req, res, next) {
        try {
            let Carts = await cartService.getCarts()
            return res.json({ status: 200, carts: Carts })
        }
        catch (error) {
            next(error)
        }
    }
    async getCartById(req, res, next) {
        try {
            let id = req.params.cid
            let cartFind = await cartService.getByIdAndPopulate(id)
            if (cartFind) {
                return res.json({ status: 200, cart: cartFind })
            }
            else {
                return res.json({})
            }
        }
        catch (error) {
            next(error)
        }
    }
    async createCart(req, res, next) {
        try {
            const cart = await cartService.create()
            return res.json({ status: 200, cart: cart })

        }
        catch (error) {
            next(error)
        }
    }
    async updateCart(req, res, next) {
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            let quantity = Number(req.body.quantity);
            let cart = await cartService.getById(cid)
            let product = await productService.getById(pid)
            let stock = product.stock
            let cartProducts = cart.products
            let check = cartProducts.find(cart => cart.product === pid)
            if (!check) {
                if (quantity <= product.stock) {
                    let update = await cartService.update(cid, pid, quantity)
                    let getStock = await productService.getById(pid)
                    return res.json({ success: true, status: 200, update: update })
                }
                else {
                    return res.json({ success: false, status: 400, message: "Not indicated stock available" })
                }
            }
            else {
                return res.json({ success: false, status: 400, error: "El producto ya existe" })
            }
        }
        catch (error) {
            next(error)
        }
    }

    async deleteCart(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            const cart = await cartService.getById(cid)
            const products = cart.products
            if (cid, pid) {
                const updatedCart = await Cart.findOneAndUpdate(
                    { _id: cid },
                    { $pull: { products: { product: pid } } },
                    { new: true }
                ).populate("products.product", "title description stock thumbnail price code");
                return res.json({
                    success: true, status: 200, updatedCart
                })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async totalAmount(req, res, next) {
        let cid = req.params.cid
        let amount = 0
        let cartID = await Cart.findById(cid).populate({
            path: "products", populate: { path: "product", model: "products" }
        })
        let cartProducts = cartID.products
        cartProducts.forEach(product => {
            let price = Number(product.product.price) * product.quantity
            amount = amount + price
        })
        return res.json({
            status: 200,
            total: amount,
        })
    }
    async purchaseRequest(req, res, next) {
        try {
            if (req.params.cid && req.body.purchaser) {
                const cid = req.params.cid;
                let amount = 0
                let code = 0;
                const cart = await cartService.getByIdAndPopulate(cid);
                const productsInCart = cart.products;
                const tickets = await ticketService.getTickets();
                const notStockP = [];
                const successProducts = [];
                if (tickets.length > 0) {
                    code = Math.max(...tickets.map(ticket => Number(ticket.code))) + 1;
                }
                for (const productInfo of productsInCart) {
                    const check = await productService.getById(productInfo.product._id);
                    if (check.stock >= productInfo.quantity) {
                        successProducts.push({ ...check, quantity: productInfo.quantity })
                    } else {
                        notStockP.push(check);
                    }
                }
                for (const product of successProducts) {
                    let price = Number(product._doc.price) * Number(product.quantity);
                    console.log(price)
                    amount = Number(amount) + Number(price);
                    const substract = Number(product._doc.stock) - Number(product.quantity);
                    await Products.findByIdAndUpdate(product._doc._id, { stock: substract });
                }
                await cartService.updateAndClear(cid);
                const body = { ...req.body, code: code, amount: amount, product: successProducts };
                await ticketService.create(body);
                return res.json({ success: true, successProducts: successProducts, failedProducts: notStockP });
            } else {
                return res.json({ success: false, message: "Params missing" })
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async addUnit(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.params.quantity
            let product = await productService.getById(pid)
            let check = product.stock
            if (cid && pid && quantity) {
                if (quantity <= product.stock) {
                    await Cart.findByIdAndUpdate(cid, {
                        $set: {
                            "products.$[elem].quantity": quantity
                        }
                    }, {
                        arrayFilters: [{ "elem.product": pid }]
                    });
                    return res.json({
                        status: 200,
                    })
                }
                else {
                    return res.json({ status: 400, success: false })
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async substractUnit(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.params.quantity
            if (cid && pid && quantity) {
                await Cart.findByIdAndUpdate(cid, {
                    $set: {
                        "products.$[elem].quantity": quantity
                    }
                }, {
                    arrayFilters: [{ "elem.product": pid }]
                });
                return res.json({
                    status: 200,
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}
const { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart, purchaseRequest } = new CartController();

export { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart, purchaseRequest }