
import Carts from "../models/cart.model.js"
import mongoose from "mongoose";
export default class CartManager {
    constructor() {
        this.Carts = Carts;
    }
    async getCarts() {
        try {
            return await this.Carts.find({})
        }
        catch (e) {
            console.log(e)
        }
    }
    async getById(id) {
        try {
            return await this.Carts.findById(id)
        }
        catch (e) {
            console.log(e)
        }
    }
    async getByIdAndPopulate(id) {
        try {
            return await this.Carts.findById(id).populate({
                path: 'products',
                populate: {
                    path: 'product',
                    model: "products"
                }
            }).exec()
        }
        catch (e) {
            console.log(e)
        }
    }
    async create() {
        try {
            return await this.Carts.create({})
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(cid, pid, quantity) {
        return await this.Carts.findByIdAndUpdate(cid, {
            $push: {
                products: {
                    product: pid,
                    quantity: quantity
                }
            }
        })
    }
    async findByIdAndUpdate(cid, toUpdate) {
        return await this.Carts.findOneAndUpdate(cid, toUpdate)
    }
    async update(cid, toUpdate) {
        return await this.Carts.findByIdAndUpdate(cid, toUpdate)
    }
    async delete(id) {
        return await this.Carts.findByIdAndDelete(id)
    }
}
