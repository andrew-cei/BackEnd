import {promises as fs} from 'fs'

// Manejador de productos
export default class ProductManager{
    constructor(path){
        this.path = path;
        this.product = null;
        this.products = [];
    }
    // Agregar producto
    async addProduct(product){
        try{
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const prod = this.products.find(prod => prod.code === product.code);
            if(prod){
                console.log("Producto Encontrado, no se añadió");
            }else{
                this.products.push(product);
                await fs.writeFile(this.path,JSON.stringify(this.products));
                console.log("Producto añadido");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    // Obtener todos los productos
    async getProducts(){
        try{
            console.log(this.path);
            this.products = JSON.parse(await fs.readFile(this.path,'utf-8'));
            console.log(this.products);
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
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            this.prod = this.products.find(prod => prod.id === id);
            if(this.prod){
                console.log(this.prod);
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
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const prod = this.products.find(prod => prod.id === id);    
            if (prod){
                await fs.writeFile(this.path,JSON.stringify(this.products.filter(prod => prod.id != id)));
                return true;
            }else{
                console.log("Producto no encontrado");
                return false;
            }
        }
        catch(error){
            console.log(error);
        }
    }
    // Actualizar producto por ID
    async updateProduct(product){
        try{
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const indice = this.products.findIndex(prod => prod.id === product.id);
        
            if(indice != -1){
                this.products[indice].title = product.title;
                this.products[indice].description = product.description;
                this.products[indice].price = product.price;
                this.products[indice].thumbnail = product.thumbnail;
                this.products[indice].code = product.code;
                this.products[indice].stock = product.stock;
                await fs.writeFile(this.path,JSON.stringify(this.products))
            }else{
                console.log("Producto no encontrado")
            }
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