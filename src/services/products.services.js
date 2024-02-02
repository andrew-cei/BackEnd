import ProductsDaoDB from "../dao/mongodb/ProductsDao.js";

const productsDao = new ProductsDaoDB();

export default class ProductsServices{
    // Obtener todos los productos
    getAllProducts = async () => {
        try {
            return await productsDao.getProducts();
        } catch (error) {
            console.log(error);
        }
    }
    // Obtener un producto por ID
    getProductById = async (id) => {
        try {
            const prod = await productsDao.getProductById(id);
            if(!prod) return false;
            else return prod;
        } catch (error) {
            console.log(error);
        }
    }
    // Agregar un producto
    addProduct = async (product) => {
        try {
            const newProd = await productsDao.addProduct(product);
            if(!newProd) return false;
            else return newProd;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar un producto por ID
    updateProduct = async (id, product) => {
        try {
            const prodUpd = await productsDao.updateProduct(id, product);
            if(!prodUpd) return false;
            else return prodUpd;        
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar un producto por ID
    deleteProduct = async (id) => {
        try {
            const prodDel = await productsDao.deleteProduct(id);
            if(!prodDel) return false;
            else return prodDel;         
        } catch (error) {
            console.log(error);
        }
    }

}
