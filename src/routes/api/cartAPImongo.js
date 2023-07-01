import { Router } from "express";
import ProductManager from "../../managers/product.js"
import CartManager from "../../managers/cart.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"
import Products from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";


const router = Router()

/* CARTS */

router.get("/", async (req, res, next) => {
    try {
        let Carts = await Cart.find()
        return res.json({ status: 200, carts: Carts })
    }
    catch (error) {
        next(error)
    }
})
router.get("/:cid", async (req, res, next) => {
    try {
        let id = req.params.cid
        let cartFind = await Cart.findById(id).populate({
            path: "products", populate: { path: "product", model: "products" },
            options: { sort: { "product.title": 1 } }
        })
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
})
router.post("/", async (req, res, next) => {
    try {
        const cart = await Cart.create({})
        return res.json({ status: 200, cart: cart })

    }
    catch (error) {
        next(error)
    }
})
router.put("/:cid/products/:pid", async (req, res, next) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let quantity = Number(req.body.quantity);
        let cart = await Cart.findById(cid)
        let cartProducts = cart.products
        let check = cartProducts.find(cart => cart.product === pid)
        if (!check) {
            let update = await Cart.findByIdAndUpdate(cid, {
                $push: {
                    products: {
                        product: pid,
                        quantity: quantity
                    }
                }
            })
            let getStock = await Products.findById(pid)
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
})
router.put("/:cid/products/:pid/:quantity/add", async (req, res) => {
    try {
    let cid = req.params.cid
    let pid = req.params.pid
    let quantity = req.params.quantity
    let product = await Products.findById(pid)
    let check = product.stock
    if (cid && pid && quantity && check >= 1) {
        await Cart.findByIdAndUpdate(cid, {
            $set: {
              "products.$[elem].quantity": quantity
            }
          }, {
            arrayFilters: [{ "elem.product": pid }]
          });
        let getStock = await Products.findById(pid)
        let newQuantity = (Number(getStock.stock) - 1);
        await Products.findByIdAndUpdate(pid, { stock: newQuantity })
        return res.json({
            status: 200,
        })
    }
    }
    catch(error) {
        console.log(error)
    }
})
router.put("/:cid/products/:pid/:quantity/subtract", async (req, res) => {
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
        let getStock = await Products.findById(pid)
        let newQuantity = (Number(getStock.stock) + 1);
        await Products.findByIdAndUpdate(pid, { stock: newQuantity })
        return res.json({
            status: 200,
        })
    }
    }
    catch(error) {
        console.log(error)
    }
})
router.delete("/:cid/products/:pid", async (req, res, next) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        const productID = await Cart.findById(cid)
        const quantity = productID.products.find((product) => product.product === pid)
        let product = await Products.findById(pid)
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
})
router.get("/bills/:cid", async (req, res) => {
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
})

export default router