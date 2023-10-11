import CartManager from "../dao/cartdao.js";

export default class CartRepository {
    constructor() {
        this.cartDAO = new CartManager();
    }

    async getCarts() {
        return await this.cartDAO.getCarts();
    }

    async getById(id) {
        return await this.cartDAO.getById(id);
    }

    async getByIdAndPopulate(id) {
        return await this.cartDAO.getByIdAndPopulate(id);
    }

    async create() {
        return await this.cartDAO.create();
    }

    async update(cid, pid, quantity) {
        return await this.cartDAO.update(cid, pid, quantity);
    }
    async updateById(cid, params) {
        return await this.cartDAO.updateById(cid, params)
    }
    async updateAndClear(cid) {
        return await this.cartDAO.updateAndClear(cid);
    }

    async delete(id) {
        return await this.cartDAO.delete(id);
    }
}
