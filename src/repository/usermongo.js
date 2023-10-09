import userManager from "../dao/userdao.js";

export default class UserManager {
    constructor() {
        this.userManager = new userManager()
    }
    async getById(id) {
        try {
            return await this.userManager.getById(id)
        }
        catch (e) {
            console.log(error)
        }
    }
    async findOne(param) {
        try {
            return await this.userManager.findOne(param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(id, param) {
        try {
            return await this.userManager.update(id, param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async delete(id) {
        try {
            return await this.userManager.delete(id)
        }
        catch (e) {
            console.log(e)
        }
    }
    async create(body) {
        try {
            return await this.userManager.create(body)
        }
        catch(e) {
            console.log(e)
        }
    }
}