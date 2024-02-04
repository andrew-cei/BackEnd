import CartsServices from "../services/carts.services.js";
import ProductService from "../services/products.services.js";
import TicketsServices from "../services/tickets.services.js";

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
                res.status(200).json(newTicket);
            } else {
                res.status(200).json({msg: 'No hay productos en tu carrito'});
            }
        } catch (error) {
            next(error.message);
        }
    }
}
