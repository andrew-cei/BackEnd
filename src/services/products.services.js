import ProductDaoDB from "../dao/mongodb/ProductDao.js";

const productManager = new ProductDaoDB();
// Obtener todos los productos
export const getAllProducts = async () => {
    try {
        return await productManager.getProducts();
    } catch (error) {
        console.log(error);
    }
}
// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const prod = await productManager.getProductById(id);
        if(!prod) return false;
        else return prod;
    } catch (error) {
        console.log(error);
    }
}
// Agregar un producto
export const addProduct = async (product) => {
    try {
        const newProd = await productManager.addProduct(product);
        if(!newProd) return false;
        else return newProd;
    } catch (error) {
        console.log(error);
    }
}
// Actualizar un producto por ID
export const updateProduct = async (id, product) => {
    try {
        const prodUpd = await productManager.updateProduct(id, product);
        if(!prodUpd) return false;
        else return prodUpd;        
    } catch (error) {
        console.log(error);
    }
}
// Borrar un producto por ID
export const deleteProduct = async (id) => {
    try {
        const prodDel = await productManager.deleteProduct(id);
        if(!prodDel) return false;
        else return prodDel;         
    } catch (error) {
        console.log(error);
    }
}