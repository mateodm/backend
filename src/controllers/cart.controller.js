

import Products from "../models/product.model.js";
import Cart from "../models/cart.model.js"
import {productService, cartService} from "../service/index.js"
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
            let cartProducts = cart.products
            let check = cartProducts.find(cart => cart.product === pid)
            if (!check) {
                let update = await cartService.update(cid, pid, quantity)
                let getStock = await productService.getById(pid)
                let newQuantity = getStock.stock - quantity;
                await Products.findByIdAndUpdate(pid, { stock: newQuantity })
                if (cid, pid) {
                    return res.json({ success: true, status: 200, update: update })
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
    async addUnit(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.params.quantity
            let product = await productService.getById(pid)
            let check = product.stock
            if (cid && pid && quantity && check >= 1) {
                await Cart.findByIdAndUpdate(cid, {
                    $set: {
                      "products.$[elem].quantity": quantity
                    }
                  }, {
                    arrayFilters: [{ "elem.product": pid }]
                  });
                let getStock = await productService.getById(pid)
                let newQuantity = (Number(getStock.stock) - 1);
                let body = { stock: newQuantity }
                await productService.update(pid, body)
                return res.json({
                    status: 200,
                })
            }
            }
            catch(error) {
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
                const getStock = await productService.getById(pid)
                const newQuantity = (Number(getStock.stock) + 1);
                const body = { stock: newQuantity }
                await productService.update(pid, body)
                return res.json({
                    status: 200,
                })
            }
            }
            catch(error) {
                console.log(error)
            }
    }
    async deleteCart(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            const cart = await cartService.getById(cid)
            const products = cart.products
            console.log(products.product)
            let quantity = products.find((product) => product.product === pid)
            let product = await productService.getById(pid)
            let newQuantity = Number(product.stock) + Number(quantity.quantity)
            if (cid, pid) {
                await Products.findByIdAndUpdate(pid, { stock: newQuantity })
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
}
const { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart } = new CartController();

export { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart }