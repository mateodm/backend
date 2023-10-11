import ProductManager from "../dao/productdao.js";

export default class ProductRepository {
    constructor() {
        this.productManager = new ProductManager();
    }

    async getProducts() {
        return await this.productManager.getProducts();
    }

    async getById(id) {
        return await this.productManager.getById(id);
    }

    async create(body) {
        return await this.productManager.create(body);
    }

    async update(id, body) {
        return await this.productManager.update(id, body);
    }

    async delete(id) {
        return await this.productManager.delete(id);
    }
    async find(body) {
        return await this.productManager.find(body)
    }
    async countDocuments(body) {
        return await this.productManager.countDocuments(body)
    }
}
