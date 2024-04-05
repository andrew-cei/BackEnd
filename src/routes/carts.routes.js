import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';
import TicketsController from '../controllers/tickets.controller.js';
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import { validateAdmin } from "../middlewares/validateAdmin.js";
// Creación de variables
const cartRouter = Router();
const cartsController = new CartsController();
const ticketsController = new TicketsController();

// Lectura de todos los carritos
cartRouter.get('/', validateAdmin, cartsController.getAllCarts)
// Lectura de un carrito
cartRouter.get('/:cid', validateLogIn, cartsController.getCart);
// Lectura de todos los tickets
cartRouter.get('/tickets', validateAdmin, ticketsController.getTickets);
// Creación del carrito
cartRouter.post('/', validateLogIn, cartsController.createCart);
// Agregar producto al carrito
cartRouter.post('/:cid/products/:pid', validateLogIn, cartsController.addProductToCart);
// Comprar productos
cartRouter.post('/:cid/purchase', validateLogIn, ticketsController.purchaseCart);
// Actualizar productos del carrito
cartRouter.put('/:cid', validateLogIn, cartsController.updateProductsInCart);
// Actualizar cantidad de producto en carrito
cartRouter.put('/:cid/products/:pid', validateLogIn, cartsController.updateQuantityProduct);
// Borrar carrito
cartRouter.delete('/:cid', validateAdmin, cartsController.delCart);
// Borrar todos los productos de un carrito
cartRouter.delete('/:cid/products', validateLogIn, cartsController.delAllProducts);
// Borrar un producto de un carrito
cartRouter.delete('/:cid/products/:pid', validateLogIn, cartsController.delOneProduct);

export default cartRouter;
