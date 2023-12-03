import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';
// Creación de variables
const cartRouter = Router();

// Lectura de todos los carritos
cartRouter.get('/', controller.getAllCarts)
// Lectura de un carrito
cartRouter.get('/:cid', controller.getCart);
// Creación del carrito
cartRouter.post('/', controller.createCart);
// Agregar producto al carrito
cartRouter.post('/:cid/product/:pid', controller.addProductToCart);
// Actualizar productos del carrito
cartRouter.put('/:cid', controller.updateProductsInCart);
// Actualizar cantidad de producto en carrito
cartRouter.put('/:cid/products/:pid', controller.updateQuantityProduct);
// Borrar carrito
cartRouter.delete('/:cid', controller.delCart);
// Borrar todos los productos de un carrito
cartRouter.delete('/:cid/products', controller.delAllProducts);
// Borrar un producto de un carrito
cartRouter.delete('/:cid/products/:pid',controller.delOneProduct);

export default cartRouter;