
import Products from "../models/product.model.js";
import productService from "../service/productService.js"
import jwt from "jsonwebtoken";
import Errorss from "../service/error/errors.js"
import CustomError from "../utils/customError.js"

class ProductController {
    async getProducts(req, res, next) {
        try {

            let products = await productService.getProducts()
            if (products) {
                return res.json({
                    success: true,
                    products: products,
                })
            }
            else {
                CustomError.createError({ name: "Product not loaded", cause: "Database not works", code: Errorss.DATABASE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async getProductsView(req, res) {
        const title = req.query.title || '';
        const page = parseInt(req.query.page) || 1;
        const pageSize = 6;
        const skip = (page - 1) * pageSize;
        const titleRegex = new RegExp(title, 'i');
        const count = await Products.countDocuments({ title: titleRegex });
        const totalPages = Math.ceil(count / pageSize);
        const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
        const products = await Products.find({ title: titleRegex })
            .skip(skip)
            .limit(pageSize)
            .exec();
        const actProducts = products.map(product => ({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            _id: product._id,
        }));
        let load = true;
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.render("products", {
            load, data: actProducts, totalPages: totalPagesArray, role: decoded.role, mail: decoded.mail, cart: decoded.cart,
        });
    }
    async getProductById(req, res, next) {
        try {
            let id = req.params.pid
            let data = await productService.getById(id)
            if (data) {
                return res.json({ status: 200, data })
            }
            else {
                CustomError.createError({ name: "Product not found", cause: ["Invalid id:" + id], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async getProductView(req, res) {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.render("product", {
            success: true,
            role: decoded.role,
            mail: decoded.mail,
            cart: decoded.cart,
        })
    }
    async createProduct(req, res, next) {
        try {
            const token = req.cookies.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role === "admin" || decoded.role === "premium") {
                req.body.created_by = decoded.mail
                let create = await productService.create(req.body)
                if (create) {
                    return res.redirect("/products")
                }
                else {
                    CustomError.createError({ name: "Params missing", cause: ["error:" + create], code: Errorss.PARAMS_MISSING_ERROR })
                }
            }
            else {
                CustomError.createError({ name: "Not authorized", cause: ["Not user premiun or admin"], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async updateProduct(req, res, next) {
        try {
            let id = req.params.pid
            let data = req.body
            console.log(data)
            let update = await productService.update(id, data)
            if (update) {
                return res.json({ status: 200, product: update })
            }
            else {
                CustomError.createError({ name: "Product not updated", cause: [update], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        try {
            let id = req.params.pid
            let product = await productService.getById(id)
            const token = req.cookies.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.mail === product.created_by || decoded.role === "admin") {
                await productService.delete(id)
                if (productService) {
                    return res.status(200).redirect("/products")
                }
                else {
                    CustomError.createError({ name: "not product deleted", cause: "Fail product ID", code: Errorss.INVALID_TYPE_ERROR })
                }
            }
            else {
                CustomError.createError({ name: "Not authorized to delete product", cause: "Not the owner of the publication or not admin", code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async productManager(req, res, next) {
        try {
            const token = req.cookies.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role === "admin") {
                let products = await productService.getProducts()
                return res.render("productManager", {
                    products: products,
                    role: decoded.role,
                    mail: decoded.mail,
                    cart: decoded.cart,
                })
            }
            else if (decoded.role === "premium") {
                let products = await productService.find({ created_by: decoded.mail })
                return res.render("productManager", {
                    products: products,
                    role: decoded.role,
                    mail: decoded.mail,
                    cart: decoded.cart,
                },)
            }
            else {
                CustomError.createError({ name: "Not authorized", cause: "Not the owner or admin", code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            CustomError.createError({ name: "Catch error", cause: error, code: Errorss.INVALID_TYPE_ERROR })
        }
    }
}
const { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsView, getProductView, productManager } = new ProductController();

export { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsView, getProductView, productManager }