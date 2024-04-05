import Product from "../dao/Product.js";
import ProductsServices from "../services/products.services.js"

const productsServices = new ProductsServices();

export default class productsDto {
    // Obtener todos los productos
    getAllProducts = async () => {
        try {
            const products = await productsServices.getAllProducts();
            const filteredProducts = [];
            products.forEach((product) => {
                filteredProducts.push({
                    "id": product._id,
                    "title": product.title,
                    "description": product.description,
                    "price": product.price,
                    "status": product.status,
                    "stock": product.stock,
                    "category": product.category,
                    "owner": product.owner,
                    "code": product.code
                })
            });
            return filteredProducts;
        } catch (error) {
            console.log(error);
        }
    }
    // Obtener un producto por ID
    getProductById = async (id) => {
        try {
            const product = await productsServices.getProductById(id);
            const filteredProduct = {
                "title": product.title,
                "description": product.description,
                "price": product.price,
                "status": product.status,
                "stock": product.stock,
                "category": product.category,
                "owner": product.owner
            };
            return filteredProduct;
        } catch (error) {
            console.log(error);
        }
    }
    // Añadir un arreglo de productos
    addProduct = async (product) => {
        try {
            const newProduct = await productsServices.addProduct(product);
            if(!newProduct) return false;
            else return newProduct;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar producto
    updateProduct = async (id, product) => {
        try {
            const prodUpdated = await productsDao.updateProduct(id, product);
            if(!prodUpdated) return false;
            else return prodUpdated;    
        } catch (error) {
            console.log(error);
        }
    }
}