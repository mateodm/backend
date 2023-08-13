
import Products from "../models/product.model.js";
import productService from "../service/productService.js"
import jwt from "jsonwebtoken";

class ProductController {
    async getProducts(req, res) {
        let products = await productService.getProducts()
        return res.json({
            success: true,
            products: products,
        })
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
        return res.render("products", {load,data: actProducts,totalPages: totalPagesArray,role: decoded.role, mail: decoded.mail,cart: decoded.cart,
        });
    }
    async getProductById(req, res) {
        try {
            let id = req.params.pid
            let data = await productService.getById(id)
            if (data) {
                return res.json({ status: 200, data })
            }
            else {
                return res.json({ message })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async getProductView(req, res) {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return res.render("product",{
                success: true,
                role: decoded.role, 
                mail: decoded.mail,
                cart: decoded.cart,
            })
    }
    async createProduct(req, res) {
        try {
            let create = await productService.create(req.body)
            return res.redirect("/products")
        }
        catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "Params missing",
            })
        }
    }
    async updateProduct(req, res) {
    try {
        let id = req.params.pid
        let data = req.body
        let update = await productService.update(id, data)
        if (update) {
            return res.json({ status: 200, product: update })
        }
        else {
            return res.json({ status: 404 })
        }
    }
    catch (error) {
        next(error)
    }
}
    async deleteProduct(req, res) {
    try {
        let id = req.params.pid
        await productService.delete(id)
        if (id) {
            return res.json({
                status: 200
            })
        }
        else {
            return res.json({ message })
        }
    }
    catch (error) {
        next(error)
    }
    }
}
const { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsView, getProductView } = new ProductController();

export { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsView, getProductView }