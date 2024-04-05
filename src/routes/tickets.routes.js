import { Router } from "express";
import TicketsController from '../controllers/tickets.controller.js';
import { validateAdmin } from "../middlewares/validateAdmin.js";

 // Creación de variables
const ticketsRouter = Router();
const ticketsController= new TicketsController();

// Lectura de todos los tickets
ticketsRouter.get('/', validateAdmin, ticketsController.getTickets);

export default ticketsRouter;