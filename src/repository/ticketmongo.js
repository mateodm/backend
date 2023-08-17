import TicketManager from "../dao/ticketdao.js";

export default class TicketRepository {
    constructor() {
        this.ticketManager = new TicketManager();
    }

    async getTickets() {
        return await this.ticketManager.getTickets();
    }

    async getById(id) {
        return await this.ticketManager.getById(id);
    }

    async create(body) {
        return await this.ticketManager.create(body);
    }

    async delete(id) {
        return await this.ticketManager.delete(id);
    }
}