import { Router } from "express";
import ProductManager from "../../managers/product.js"
import CartManager from "../../managers/cart.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"

const router = Router()
let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")

/* CARTS */
router.post("/:cid/products/:pid", async (req, res) => {
    let cid = Number(req.params.cid);
    let pid = Number(req.params.pid);
    let quantity = Number(req.body.quantity);
    console.log(quantity)
    if (cid && pid) {
        let addProduct = await cmanager.addProduct(cid, pid, quantity)
        return res.json({
            success: true,
            status: 200,
            pid,
            quantity
        })
    }
    else {
        return res.json({
            success: false,
            status: 404,
            result: "missing params"
        })
    }
})
router.delete("/:cid/products/:pid", async (req, res) => {
    let cid = Number(req.params.cid)
    let pid = Number(req.params.pid)
    if(cid && pid) {
        let deleteProduct = await cmanager.deleteProduct(cid, pid)
        return res.json(
            {
            success: true,
            status: 200,
            result: (`product (${pid}) remove succesfully`),
        }
        )
    }
    else {
        return res.json({
            success: false,
            status: 404,
            message: ("missing params")
        })
    }
})


export default router