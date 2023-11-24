import {promises as fs} from 'fs'
import {productModel} from '../dao/models/product.model.js';

// Manejador de productos
export default class ProductManagerDB{
    constructor(path){
        this.path = path;
        this.product = null;
        this.products = [];
    }
    // Agregar producto
    async addProduct(product){
        try{
            let producto = await productModel.create(product)
            console.log("Producto creado");
        }
        catch(error){
            console.log(error);
        }
    }
    // Obtener todos los productos
    async getProducts(){
        try{
            this.products = await productModel.find();
            return this.products;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }
    // Obtener un producto por ID
    async getProductById(id){
        try{
            this.prod = await productModel.findOne({_id:id});
            if(this.prod){
                return this.prod;
            }else{
                console.log("Producto no encontrado");
            }   
        }
        catch(error){
            console.log(error);
            return error;
        }
    }
    // Borrar producto por ID
    async deleteProduct(id){
        try{
            await productModel.deleteOne({_id:id});
            return true;
        }
        catch(error){
            console.log(error);
        }
    }
    // Actualizar producto por ID
    async updateProduct(id,product){
        try{
            await productModel.updateOne({_id:id},product);
        }
        catch(error){
            console.log(error);
        }  
    }
    // Obtener la última Id del arreglo
    async getLastId(){
        try{
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            return parseInt(this.products[this.products.length - 1].id);
        }
        catch(error){
            return undefined;
        }
    }
}