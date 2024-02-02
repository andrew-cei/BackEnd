import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';
import TicketsController from '../controllers/tickets.controller.js';
import { validateLogIn } from '../middlewares/validateMiddleware.js';
// Creación de variables
const cartRouter = Router();
const cartsController = new CartsController();
const ticketsController = new TicketsController();

// Lectura de todos los carritos
cartRouter.get('/', cartsController.getAllCarts)
// Lectura de un carrito
cartRouter.get('/:cid', cartsController.getCart);
// Creación del carrito
cartRouter.post('/', cartsController.createCart);
// Agregar producto al carrito
cartRouter.post('/:cid/product/:pid', cartsController.addProductToCart);
// Actualizar productos del carrito
cartRouter.put('/:cid', cartsController.updateProductsInCart);
// Actualizar cantidad de producto en carrito
cartRouter.put('/:cid/products/:pid', cartsController.updateQuantityProduct);
// Borrar carrito
cartRouter.delete('/:cid', cartsController.delCart);
// Borrar todos los productos de un carrito
cartRouter.delete('/:cid/products', cartsController.delAllProducts);
// Borrar un producto de un carrito
cartRouter.delete('/:cid/products/:pid',cartsController.delOneProduct);
// Comprar productos
cartRouter.post('/:cid/purchase',ticketsController.purchaseCart);

export default cartRouter;
