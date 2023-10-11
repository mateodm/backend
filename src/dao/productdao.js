
import Products from "../models/product.model.js"
export default class ProductManager {
    constructor() {
        this.Products = Products;
    }
    async getProducts() {
        try {
            return await this.Products.find({}).lean()
        }
        catch (e) {
            console.log(e)
        }
    }
    async getById(id) {
        try {
            return await this.Products.findById(id)
        }
        catch(e) {
            console.log(e)
        }
    }
    async create(body) {
        return await this.Products.create(body)
    }
    async update(id, body) {
        return await this.Products.findByIdAndUpdate(id, body, {new: true})
    }
    async delete(id) {
        return await this.Products.findByIdAndDelete(id)
    }
    async find(body) {
        return await this.Products.find(body).lean()
    }
    async countDocuments(body) {
        return await this.Products.countDocuments(body)
    }
}
