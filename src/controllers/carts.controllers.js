import * as service from "../services/carts.services.js";
import { getProductById, addProduct } from "../services/products.services.js";
// Obtener todos los carritos
export const getAllCarts = async(req, res, next) => {
    try {
        const response = await service.getAllCarts();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}
// Obtener un carrito
export const getCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const response = await service.getCart(cid);
        if(!response) res.status(404).json({msg: `Carrito ${id} no encontrado`});
        else res.status(200).json(response);        
    } catch (error) {
        next(error.message)
    }
}
// Crear un carrito
export const createCart = async (req, res, next) => {
    try {
        const response = await service.createCart();
        if(!response) res.status(404).send('Carrito no creado');
        else res.status(200).json({msg: 'Carrito creado'});
    } catch (error) {
        next(error.message)
    }
}
// Agregar un producto al carrito
export const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const producto = await getProductById(pid) ;
        const carrito = await service.getCart(cid);
        if(!producto) res.status(404).send(`Producto ${pid} no encontrado`);
        if(!carrito) res.status(404).send(`Carrito ${cid} no encontrado`);
        else{
            const response = service.addProductToCart(cid, pid);
            if(!response) res.status(404).send(`No se añadió ${pid} al carrito ${cid}`);
            else res.status(200).json({msg: `Carrito ${cid} actualizado`});
        }
    } catch (error) {
        next(error.message);
    }
}
// Actualizar productos del carrito
export const updateProductsInCart = async(req, res, next) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const codes = [];
        const productos = [];
        // Creación de un arreglo de productos no repetidos
        products.forEach(async element => {
            if(!codes.includes(element._id)){
                element.quantity = 1;
                codes.push(element._id);
                // Se guarda el producto no repetido
                productos.push(element);
                // Se guarda el nuevo producto
                await addProduct(element);
            }else{
                // Se aumenta en uno la cantidad del producto repetido
                const index = codes.indexOf(element._id);
                productos[index].quantity ++;
            }
        });
        console.log(productos)
        const cart = await service.updateProductsInCart(cid, productos);
        if(!cart) res.status(404).send(`Carrito ${cid} no actualizado`);
        else res.status(200).json({msg: `Carrito ${cid} actualizado`});        
    } catch (error) {
        next(error.message);
    }
}
// Actualizar cantidad de producto al carrito
export const updateQuantityProduct = async(req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await service.updateQuantityProduct(cid, pid, quantity);
        if(!cart) res.status(404).send(`Carrito ${cid} no actualizado`);
        else res.status(200).json({msg: `Carrito ${cid} actualizado`});       
    } catch (error) {
        next(error.message);
    }  
}
// Borrar un carrito
export const delCart = async(req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await service.delCart(cid);
        if(!response) res.status(404).send(`Carrito ${cid} no borrado`);
        else res.status(200).json({msg: `Carrito ${cid} borrado`});
    } catch (error) {
        next(error.message);
    }
}
// Borrar todos los productos de un carrito
export const delAllProducts = async(req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await service.delAllProducts(cid);
        if(!response) res.status(404).send(`No se borraron todos los productos del carrito ${cid}`);
        else res.status(200).json({msg: `Se borraron los productos del carrito ${cid}`});
    } catch (error) {
        next(error.message)
    }
}
// Borrar un producto de un carrito
export const delOneProduct = async(req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const response = await service.delOneProduct(cid, pid);
        if(!response) res.status(404).send(`No se pudo borrar ${pid} del carrito ${cid}`);
        else res.status(200).jason({msg: `Se borró ${pid} del carrito ${cid}`});
    } catch (error) {
        next(error.message);
    }
}