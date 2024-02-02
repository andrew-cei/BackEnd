import TicketsDaoDB from "../dao/mongodb/TicketsDao.js";

const ticketsDao = new TicketsDaoDB();

export default class TicketsServices{
    // Crear Ticket
    createTicket = async (products) => {
        try {
            return await ticketsDao.createTicket(products);
        } catch (error) {
            console.log(error);
        }
    }
    // Leer todos los tickets
    getTickets = async () => {
        try {
            return await ticketsDao.getTickets();
        } catch (error) {
            console.log(error);
        }
    }
}
