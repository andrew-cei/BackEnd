import CartDaoDB from "../dao/mongodb/CartDao.js";

const cartManager = new CartDaoDB();
// Obtener todos los carritos
export const getAllCarts = async() =>{
    try {
        return await cartManager.getCarts();
    } catch (error) {
        console.log(error)
    }
}
// Obtener un carrito
export const getCart = async(cid) => {
    try {
        const cart = await cartManager.getCart(cid);
        if(!cart) return false;
        else return cart;    
    } catch (error) {
        console.log(error);
    }
}
// Crear un carrito
export const createCart = async() => {
    try {
        const cart = await cartManager.createCart();
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
}
// Agregar producto al carrito
export const addProductToCart = async(cid, pid) => {
    try {
        const cart = await cartManager.addPorductToCart(cid, pid);
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
}
// Actualizar productos del carrito
export const updateProductsInCart = async(cid, productos) => {
    try {
        const cart = await cartManager.updateCart(cid, productos);
        if(!cart) return false;
        else return cart;   
    } catch (error) {
        console.log(error);
    }
}
// Actualizar cantidad de producto al carrito
export const updateQuantityProduct = async(cid, pid, quantity) => {
    try {
        const cart = await cartManager.updateQuantityProduct(cid, pid, quantity);
        if(!cart) return false;
        else return cart;  
    } catch (error) {
        console.log(error);
    }
}
// Borrar un carrito
export const delCart = async(cid) => {
    try {
        const cart = await cartManager.delCart(cid);
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
}
// Borrar todos los productos de un carrito
export const delAllProducts = async(cid) => {
    try {
        const cart = await cartManager.delAllProducts(cid);
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error)
    }
}
// Borrar un producto del carrito
export const delOneProduct = async(cid, pid) => {
    try {
        const cart = await cartManager.delOneProduct(cid, pid);
        if(!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
}