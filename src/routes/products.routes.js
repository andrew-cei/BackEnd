import { Router } from "express";
import Product from "../dao/Product.js";
import * as controller from "../controllers/products.controller.js";

 // Creación de variables
const prodsRouter = Router();

// Lectura de todos los productos
prodsRouter.get('/', controller.getAllProducts)
// Lectura de un solo producto por id
prodsRouter.get('/:id', controller.getProductById)
// Agregar un nuevo producto
prodsRouter.post('/', controller.addProduct)
// Actualizar producto
prodsRouter.put('/:id', controller.updateProduct)
// Borrar producto
prodsRouter.delete('/:id', controller.deleteProduct)

export default prodsRouter;