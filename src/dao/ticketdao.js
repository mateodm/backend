
import Ticket from "../models/ticket.model.js"
export default class TicketManager {
    constructor() {
        this.Ticket = Ticket;
    }
    async getTickets() {
        try {
            return await this.Ticket.find({}).lean()
        }
        catch (e) {
            console.log(e)
        }
    }
    async getById(id) {
        try {
            return await this.Ticket.findById(id)
        }
        catch (e) {
            console.log(e)
        }
    }
    async getBy(id) {
        try {
            return await this.Ticket.findOne(id)
        }
        catch (e) {
            console.log(e)
        }
    }
    async update(id, params) {
        try {
            return await this.Ticket.findByIdAndUpdate(id, params)
        }
        catch(e) {
            console.log(e)
        }
    }
    async create(body) {
        return await this.Ticket.create(body)
    }
    async delete(id) {
        return await this.Ticket.findByIdAndDelete(id)
    }
}
