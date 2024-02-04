import { Router } from "express";
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import ProductsController from "../controllers/products.controller.js";

 // Creación de variables
const productsRouter = Router();
const productsController = new ProductsController();

// Lectura de todos los productos
productsRouter.get('/', validateLogIn, productsController.getAllProducts)
// Lectura de un solo producto por id
productsRouter.get('/:id', validateLogIn, productsController.getProductById)
// Agregar un nuevo producto
productsRouter.post('/', validateLogIn, productsController.addProduct)
// Actualizar producto
productsRouter.put('/:id', validateLogIn, productsController.updateProduct)
// Borrar producto
productsRouter.delete('/:id', validateLogIn, productsController.deleteProduct)

export default productsRouter;
