import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import { validateAdmin } from "../middlewares/validateAdmin.js";

 // Creación de variables
const productsRouter = Router();
const productsController = new ProductsController();

// Módulo de Mocking
productsRouter.get('/mockingproducts', validateAdmin, productsController.getMocking);
// Lectura de todos los productos
productsRouter.get('/', validateLogIn, productsController.getAllProducts);
// Lectura de un solo producto por id
productsRouter.get('/:id', validateLogIn, productsController.getProductById);
// Agregar nuevos productos
productsRouter.post('/', validateLogIn, productsController.addProduct);
// Actualizar producto
productsRouter.put('/:id', validateLogIn, productsController.updateProduct);
// Borrar producto
productsRouter.delete('/:id', validateLogIn, productsController.deleteProduct);
// Borrar todos los productos
productsRouter.delete('/', validateAdmin, productsController.deleteProducts);

export default productsRouter;
