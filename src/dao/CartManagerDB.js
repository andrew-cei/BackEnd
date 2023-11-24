import {promises as fs} from 'fs'
import { cartsModel } from './models/cart.model.js';

export default class CartManagerDB {
    constructor(path){
        this.path = path;
        this.carts = [];
    }
    // Obtener carrito por Id
    async getCart(id){
        try{
            const cart = await cartsModel.findOne({_id:id});
            return cart;
        }catch(error){
            console.log(error);
        }
    }
    // Crear un carrito vacío con nueva Id
    async createCart() {
        try{
            await cartsModel.create({})
        }catch(error){
            console.log(error);
        }
    }
    // Agregar un producto al carrito
    async addPorductToCart(cid, pid) {
        try{
            await cartsModel.updateOne({_id:cid},{$push:{products: pid}});
        }catch(error){
            console.log(error)
        }
    }
    // Generar una nueva Id para cada carrito
    async idCart() {
        this.carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if (this.carts.length < 1) return 1
        const ids = this.carts.map(cart => cart.id);
        const id = Math.max(...ids) + 1;
        return id
    }    
}