import { cartsModel } from './models/cart.model.js';

export default class CartDaoDB {
    constructor(path){
        this.path = path;
        this.carts = [];
    }
    // Obtener todos los carritos
    async getCarts(){
        try {
            return await cartsModel.find();
        } catch (error) {
            console.log(error);
        }
    }
    // Obtener carrito por Id
    async getCart(cid){
        try{
            const cart = await cartsModel.findOne({_id:cid});
            return cart;
        }catch(error){
            console.log(error);
        }
    }
    // Crear un carrito vacío con nueva Id
    async createCart() {
        try{
            const cart = await cartsModel.create({});
            return cart;
        }catch(error){
            console.log(error);
        }
    }
    // Agregar un producto al carrito
    async addPorductToCart(cid, pid) {
        try{
            const cart = await cartsModel.updateOne({_id:cid},{$push:{products: {_id: pid, quantity: 1}}});
            return cart;
        }catch(error){
            console.log(error)
        }
    }
    // Actualizar productos en carrito
    async updateCart(cid, productos){
        try {
            const cart = await cartsModel.updateOne({_id:cid},{products: productos});
            return cart;
        } catch (error) {
            console.log(error)
        }
    }
    // Actualizar cantidad de un producto en un carrito
    async updateQuantityProduct(cid, pid, qty){
        try {
            const cart = await cartsModel.updateOne({$and: [{_id:cid}, {'products._id':pid}]}, {$set: {'products.$.quantity':qty}});
            return cart;
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar un carrito
    async delCart(cid){
        try {
            const cart = await cartsModel.deleteOne({_id:cid});
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar todos los productos de un carrito
    async delAllProducts(cid){
        try {
            const cart = await cartsModel.updateOne({_id:cid},{$set: {products: []}});
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar un producto del carrito
    async delOneProduct(cid, pid){
        try {
            const cart = await cartsModel.updateOne({_id:cid},{$pull: {products: {_id: pid}}});
            return cart;
        } catch (error) {
            console.log(error)
        }
    }
}