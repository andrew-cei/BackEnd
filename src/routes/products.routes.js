import { Router } from "express";
import Product from "../classes/Product.js";
import ProductManager from "../classes/ProductManager.js";
// Creación de variables
const prodsRouter = Router();
const productsPath = "./src/data/productos.json";
// Creación del Product Manager
const manager = new ProductManager(productsPath);

// Lectura de todos los productos
prodsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    if (limit) {        
        const filteredProducts = products.slice(0, limit);
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
})

// Lectura de un solo producto por id
prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await manager.getProductById(parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.send('Producto no encontrado, prueba otro id');
    }
})

// Agregar un nuevo producto
prodsRouter.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock } = req.body;
    const lastId = await manager.getLastId();
    const prod = new Product(lastId + 1, title, description, price, thumbnail, code, stock);
    await manager.addProduct(prod);
    res.status(200).send(req.body);
})

// Actualizar producto
prodsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const id_confirm = await manager.getProductById(parseInt(id));
    if (id_confirm) {
        const {title, description, price, thumbnail, code, stock } = req.body;
        const prod = new Product(parseInt(id), title, description, price, thumbnail, code, stock);
        await manager.updateProduct(prod);
        res.status(200).send('Producto Actualizado');
    } else {
        res.status(404).send('Producto No Encontrado');
    }
})

// Borrar producto
prodsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const confirmation = await manager.deleteProduct(parseInt(id));
    if (confirmation) {
        console.log(`Producto con ID ${id} Borrado`);
        res.status(200).send(`Producto con ID ${id} fue borrado`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
})

export default prodsRouter;