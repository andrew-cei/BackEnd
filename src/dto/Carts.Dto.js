import CartsServices from "../services/carts.services.js";
import ProductService from "../services/products.services.js";

const cartsServices = new CartsServices();

export default class CartsDto {
    // Obtener todos los carritos
    getAllCarts = async () => {
        try {
            return await cartsServices.getAllCarts();
        } catch (error) {
            Console.log(error);
        }
    }
    // Obtener un carrito
    getCart = async (cid) => {
        try {
            const cart = await cartsServices.getCart(cid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Crear un carrito
    createCart = async () => {
        try {
            const cart = await cartsServices.createCart();
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Agregar producto al carrito
    addProductToCart = async (cid, pid) => {
        try {
            const cart = await cartsServices.addProductToCart(cid, pid);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar productos del carrito
    updateProductsInCart = async (cid, productos) => {
        try {
            const cart = await cartsServices.updateProductsInCart(cid, productos);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar cantidad de producto al carrito
    updateQuantityProduct = async (cid, pid, quantity) => {
        try {
            let cart = await cartsServices.addProductToCart(cid, pid);
            cart = await cartsServices.updateQuantityProduct(cid, pid, quantity);
            if (!cart) return false;
            else return cart;
        } catch (error) {
            console.log(error);
        }
    }
}