import { Router } from 'express';
import Product from "../dao/Product.js";
import ProductManager from '../dao/ProductManager.js';
// Creación de variables
const viewsRouter = Router();
const productsPath = "./src/data/productos.json";
// Creación del Product Manager
const manager = new ProductManager(productsPath);


viewsRouter.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', { products })
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

viewsRouter.post('/realtimeproducts', async (req, res) => {
    const { id, title, description, price, thumbnail, code, stock } = req.body;
    console.log(id)
    if (id!==undefined) {
        await manager.deleteProduct(parseInt(id));
    } else {
        const lastId = await manager.getLastId();
        const prod = new Product(lastId + 1, title, description, price, thumbnail, code, stock);
        await manager.addProduct(prod);
    }
})

export default viewsRouter;