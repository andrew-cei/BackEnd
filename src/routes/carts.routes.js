import { Router } from 'express';
import CartManagerDB from '../dao/CartManagerDB.js';
// Creación de variables
const cartRouter = Router();
const cartPath = "./src/data/cart.json";
// Creación del Cart Manager
const manager = new CartManagerDB(cartPath)

// Lectura de un carrito
cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    //const cart = await manager.getCart(parseInt(cid));
    const cart = await manager.getCart(cid);
    if (cart)
        res.status(200).json(cart.products);
    else
        res.status(400).send('No se ha creado carrito todavía');
});

// Creación del carrito
cartRouter.post('/', async (req, res) => {
    await manager.createCart()
    res.status(200).send('Carrito creado');
});


// Agregar producto al carrito
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    //const cart = await manager.getCart(parseInt(cid))
    const cart = await manager.getCart(cid)
    console.log(cart)
    if (cart) {
        //await manager.addPorductToCart(parseInt(cid), parseInt(pid))
        await manager.addPorductToCart(cid, pid)
        res.status(200).send('Product Added')
    } else {
        res.status(400).send('There is no Any Cart Created Yet or This cart just not exist')
    }
});

export default cartRouter;