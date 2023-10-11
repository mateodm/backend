import User from "../models/user.model.js";

export default class UserManager {
    constructor() {
        this.user = User
    }
    async getUsers() {
        try {
            return await this.user.find().select('-password').lean()
        }
        catch(e) {
            console.log(e)
        }
    }
    async getById(id) {
        try {
            return await this.user.findById(id).select('-password')
        }
        catch (e) {
            console.log(e)
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
    async updateByMail(paramvalue, body) {
        try {
            return await this.user.findOneAndUpdate({ mail: paramvalue }, body)
        }
        catch (e) {
            console.log(e)
        }
    }
    async updateRole(id, role) {
        try {
            return await this.user.findByIdAndUpdate(id, {role: role})
        }
        catch(e) {
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
