import CartsDaoDB from "../dao/mongodb/CartsDao.js";

const cartsDao = new CartsDaoDB();

export default class CartsServices {
    // Obtener todos los carritos
    getAllCarts = async () => {
        try {
            return await cartsDao.getCarts();
        } catch (error) {
            console.log(error)
        }
    }
    // Obtener un carrito
    getCart = async (cid) => {
        try {
            const cart = await cartsDao.getCart(cid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Crear un carrito
    createCart = async () => {
        try {
            const cart = await cartsDao.createCart();
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Agregar producto al carrito
    addProductToCart = async (cid, pid) => {
        try {
            const cart = await cartsDao.addPorductToCart(cid, pid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar productos del carrito
    updateProductsInCart = async (cid, productos) => {
        try {
            const cart = await cartsDao.updateCart(cid, productos);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar cantidad de producto al carrito
    updateQuantityProduct = async (cid, pid, quantity) => {
        try {
            const cart = await cartsDao.updateQuantityProduct(cid, pid, quantity);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar un carrito
    delCart = async (cid) => {
        try {
            const cart = await cartsDao.delCart(cid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar todos los productos de un carrito
    delAllProducts = async (cid) => {
        try {
            const cart = await cartsDao.delAllProducts(cid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar un producto del carrito
    delOneProduct = async (cid, pid) => {
        try {
            const cart = await cartsDao.delOneProduct(cid, pid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
}
