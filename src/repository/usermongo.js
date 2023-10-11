import userManager from "../dao/userdao.js";

export default class UserManager {
    constructor() {
        this.userManager = new userManager()
    }
    async getUsers() {
        try {
            return await this.userManager.getUsers()
        }
        catch(e) {
            console.log(e)
        }
    }
    async getById(id) {
        try {
            return await this.userManager.getById(id)
        }
        catch (e) {
            console.log(e)
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
    async updateByMail(id, param) {
        try {
            return await this.userManager.updateByMail(id, param)
        }
        catch (e) {
            console.log(e)
        }
    }
    async updateRole(id, param) {
        try {
            return await this.userManager.updateRole(id, param)
        }
        catch(e) {
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