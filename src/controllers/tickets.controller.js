import CartsServices from "../services/carts.services.js";
import ProductService from "../services/products.services.js";
import TicketsServices from "../services/tickets.services.js";
import { transporter } from '../services/email.service.js';
import config from '../../config.js';

const productService = new ProductService();
const cartsServices = new CartsServices();
const ticketsServices = new TicketsServices();

export default class CartsController {
    // Comprar productos
    purchaseCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const cart = await cartsServices.getCart(cid);
            const newCart = [];
            let totalAmount = 0;
            // Revisión por cada producto
            cart.products.forEach(async (product) => {
                const pid = product._id;
                const quantity = parseInt(product.quantity);
                const stockProduct = await productService.getProductById(pid);
                // Verificación de Stock
                const newStock = stockProduct.stock - quantity;
                if (newStock >= 0) {
                    totalAmount = totalAmount + quantity * stockProduct.price;
                    await productService.updateProduct(pid, { stock: newStock });
                } else {
                    newCart.push(product);
                }
            })
            // Actualización del carrito
            await cartsServices.updateProductsInCart(cid, newCart);
            // Creación del código único
            const tickets = await ticketsServices.getTickets();
            let generatedCode = 0;
            tickets.forEach((ticket) => {
                if (ticket.code > generatedCode) {
                    generatedCode = ticket.code;
                }
            })
            generatedCode++;
            // Creación del ticket
            const ticket = {
                code: generatedCode,
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.session.user.email
            }
            // Guardado del ticket
            if (totalAmount != 0) {
                const newTicket = await ticketsServices.createTicket(ticket);
                // Envío del correo de compra
                const mailOptions = {
                    from: config.USER,
                    to: ticket.purchaser,
                    subject: "Compra exitosa",
                    html: `
                    <h1>Dettalles de tu compra</h1>
                    <p>Código: ${ticket.code}</p>
                    <p>Fecha de compra: ${ticket.purchase_datetime}</p>
                    <p>Total de compra: ${ticket.amount}</p>
                    <p>Usuario: ${ticket.purchaser}</p>
                    `
                }
                const response = await transporter.sendMail(mailOptions);                
                res.status(200).json(newTicket);
            } else {
                res.status(200).json({msg: 'No hay productos en tu carrito'});
            }
        } catch (error) {
            next(error.message);
        }
    }
    // Obtener todos los tickets
    getTickets = async (req, res, next) => {
        try {
            console.log('hola')
            const tickets = await ticketsServices.getTickets();
            res.status(200).json(tickets);
        } catch (error) {
            next(error.message);
        }
    }
}
