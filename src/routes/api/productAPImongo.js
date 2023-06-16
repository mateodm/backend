import { Router } from "express";
import Products from "../../models/product.model.js";
import products_router from "../views/products.router.js"
import carts_router from "../views/carts.router.js"

const router = Router()
/* AÑADIR PRODUCTO */
router.post("/post", async (req, res) => {
    try {
        let title = req.body.title 
        let description = req.body.description 
        let price = Number(req.body.price)
        let thumbnail = req.body.thumbnail 
        let code = req.body.code
        let stock = Number(req.body.stock) 
        console.log(title, description, price, thumbnail, code, stock)
        let add = await Products.create(req.body)
        return res.redirect("/products")
    }
    catch(error) {
            return res.json({
                success: false,
                status: 400,
                message: "Params missing",
                error: {title, description, price, thumbnail, code, stock}
            })
        }
        }
)

router.get("/:pid" , async (req, res, next) => {
    try {
    let id = req.params.pid
    console.log(id)
    let data = await Products.findById(id)
    console.log(data)
    if (data) {
        return res.json({status: 200, data})
    }
    else {
        return res.json({message})
    }
    }
    catch(error) {
        next(error)
    }
})
router.delete("/:pid", async (req, res, next) => {
    try {
        let id = req.params.pid
        await Products.findByIdAndDelete(id)
        if (id) {
            return res.json({status: 200
            })
        }
        else {
            return res.json({message})
        }
    }
    catch(error) {
        next(error)
    }
})

router.put("/:pid", async (req, res, next) => {
    try {
        let id = req.params.pid
        let data = req.body
        let update = await Products.findByIdAndUpdate(id, data, {new: true})
        if (update) {
            return res.json({status: 200, product: update})
        }
        else {
            return res.json({status: 404})
        }
    }
    catch(error) {
        next(error)
    }
})
export default router