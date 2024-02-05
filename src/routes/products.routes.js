import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

 // Creación de variables
const productsRouter = Router();
const productsController = new ProductsController();

// Módulo de Mocking
productsRouter.get('/mockingproducts', productsController.getMocking);
// Lectura de todos los productos
productsRouter.get('/',  validateAdmin, productsController.getAllProducts);
// Lectura de un solo producto por id
productsRouter.get('/:id', validateAdmin, productsController.getProductById);
// Agregar un nuevo producto
productsRouter.post('/', validateAdmin, productsController.addProduct);
// Actualizar producto
productsRouter.put('/:id', validateAdmin, productsController.updateProduct);
// Borrar producto
productsRouter.delete('/:id', validateAdmin, productsController.deleteProduct);

export default productsRouter;
