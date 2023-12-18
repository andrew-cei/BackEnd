import { Router } from 'express';
import Product from "../dao/Product.js";
import ProductManager from '../dao/filesystem/ProductDao.js';
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import { getAllProducts } from '../services/products.services.js';
// Creación de variables
const viewsRouter = Router();
const productsPath = "./src/data/productos.json";
// Creación del Product Manager
const manager = new ProductManager(productsPath);

// Acceso a login
viewsRouter.get('/', async (req, res) => {
    res.render('login');
})
// Registro de usuario
viewsRouter.get('/register', (req, res) => {
    res.render('register');
})
// Perfil de usuario con productos
viewsRouter.get('/products', validateLogIn , async (req, res) => {
    const products = await getAllProducts();
    const { first_name, last_name, role } = req.session.user;
    res.render('home', { products, first_name, last_name, role});
})
// Logout de usuario
viewsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.redirect('/');
        else res.send({ status: 'Logout ERROR', body: err });
    })
})

// Error al registrar
viewsRouter.get('/register-error', (req, res) => {
    res.render('register-error');
})
// Error al acceder (login)
viewsRouter.get('/error-login', (req, res) => {
    res.render('error-login');
})
// Productos en tiempo real
viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})
// Agregar producto en tiempo real
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