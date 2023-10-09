import User from "../models/user.model.js";

export default class UserManager {
    constructor() {
        this.user = User
    }
    async getById(id) {
        try {
            return await this.user.getById(id)
        }
        catch (e) {
            console.log(error)
        }
    }
    async findOne(param) {
        try {
            return await this.user.findOne(param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(id, param) {
        try {
            return await this.user.findByIdAndUpdate(id, param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async delete(id) {
        try {
            return await this.user.findByIdAndDelete(id)
        }
        catch (e) {
            console.log(e)
        }
    }
    async create (body) {
        try {
            return await this.user.create(body) 
        }
        catch(e) {
            console.log(e)
        }
    }
}
