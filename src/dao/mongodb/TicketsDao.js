import {ticketModel} from './models/ticket.model.js';

// Manejador de productos
export default class TicketDaoDB{
    constructor(path = ''){
        this.products = [];
        this.tickets = [];
    }
    // Crear Ticket
    async createTicket(products){
        try{
            this.products = await ticketModel.create(products);
            return this.products;
        }
        catch(error){
            console.log(error);
        }
    }
    // Leer todos los tickets
    async getTickets(){
        try {
            this.tickets = await ticketModel.find().lean();
            return this.tickets;
        } catch (error) {
            console.log(error);
        }
    }
}
