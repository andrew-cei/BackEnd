import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

 // Creación de variables
const productsRouter = Router();
const productsController = new ProductsController();

// Lectura de todos los productos
productsRouter.get('/', productsController.getAllProducts)
// Lectura de un solo producto por id
productsRouter.get('/:id', productsController.getProductById)
// Agregar un nuevo producto
productsRouter.post('/', productsController.addProduct)
// Actualizar producto
productsRouter.put('/:id', productsController.updateProduct)
// Borrar producto
productsRouter.delete('/:id', productsController.deleteProduct)

export default productsRouter;
