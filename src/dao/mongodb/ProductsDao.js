import {productModel} from './models/product.model.js';

// Manejador de productos
export default class ProductsDaoDB{
    constructor(path){
        this.path = path;
        this.product = null;
        this.products = [];
    }
    // Agregar producto
    async addProduct(product){
        try{
            this.product = await productModel.create(product)
            console.log("Producto creado");
            return this.product;
        }
        catch(error){
            console.log(error);
        }
    }
    // Obtener todos los productos
    async getProducts(){
        try{
            this.products = await productModel.find().lean();
            return this.products;
        }
        catch(error){
            console.log(error);
        }
    }
    // Obtener un producto por ID
    async getProductById(id){
        try{
            this.product = await productModel.findOne({_id:id}).lean();
            if(this.product){
                return this.product;
            }else{
                console.log("Producto no encontrado");
            }   
        }
        catch(error){
            console.log(error);
        }
    }
    // Borrar producto por ID
    async deleteProduct(id){
        try{
            this.product = await productModel.deleteOne({_id:id});
            return this.product;
        }
        catch(error){
            console.log(error);
        }
    }
    // Actualizar producto por ID
    async updateProduct(id,product){
        try{
            this.product = await productModel.updateOne({_id:id},product);
            return this.product;
        }
        catch(error){
            console.log(error);
        }  
    }
}
