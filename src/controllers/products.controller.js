import Product from "../dao/Product.js";
import ProductsServices from "../services/products.services.js"

const productsServices = new ProductsServices();

export default class productsController {
    // Obtener todos los productos
    getAllProducts = async (req, res, next) => {
        try {
            const response = await productsServices.getAllProducts(req.query);
            res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    // Obtener un producto por ID
    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await productsServices.getProductById(id);
            if (!response) res.status(404).json({ msg: "Poducto no encontrado" })
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    // Añadir un producto
    addProduct = async (req, res, next) => {
        try {
            let products;
            const newProds = [];
            !Array.isArray(req.body) ? products = [req.body]: products = req.body;
            for(let i=0; i < products.length; i++) {
                let { title, description, code, price, status, stock, category, thumbnails } = products[i];
                let product = new Product(title, description, category, price, thumbnails, code, stock, status);
                let newProd = await productsServices.addProduct(product);
                newProds.push(newProd);
            }
            if (!newProds) res.status(404).json({ msg: "Error al crear el producto" });
            else res.status(200).json(newProds);
        } catch (error) {
            next(error.message);
        }
    }
    // Actualizar producto
    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const oldProd = await productsServices.getProductById(id);
            let { title, description, code, price, status, stock, category, thumbnails } = req.body;
            // Si la propiedad no viene en el request, se queda la propiedad anterior
            if (!title) title = oldProd.title;
            if (!description) description = oldProd.description;
            if (!code) code = oldProd.code;
            if (!price) price = oldProd.price;
            if (!status) status = oldProd.status;
            if (!stock) stock = oldProd.stock;
            if (!category) category = oldProd.category;
            if (!thumbnails) thumbnails = oldProd.thumbnails;
            // Creación del producto actualizado y guardado
            const product = new Product(title, description, category, price, thumbnails, code, stock, status)
            const upProd = await productsServices.updateProduct(id, product);
            if (!upProd) res.status(404).json({ msg: `Error al actualizar el producto ${id}` });
            else res.status(200).json(upProd);
            console.log(upProd);
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar producto
    deleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const delProd = await productsServices.deleteProduct(id);
            if (!delProd) res.status(404).json({ msg: `Error al borrar el producto ${id}` });
            else res.status(200).json(delProd);
        } catch (error) {
            next(error.message);
        }
    }
}
