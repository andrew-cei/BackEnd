import Product from "../dao/Product.js";
import * as service from "../services/products.services.js"
// Obtener todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        const response = await service.getAllProducts(req.query);
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}
// Obtener un producto por ID
export const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await service.getProductById(id);
        if(!response) res.status(404).json({msg: "Poducto no encontrado"})
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}
// Añadir un producto
export const addProduct = async (req, res, next) => {
    try {
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        const product = new Product(title, description, category ,price, thumbnails, code, stock, status)
        const newProd = await service.addProduct(product);
        if(!newProd) res.status(404).json({msg: "Error al crear el producto"});
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const oldProd = await service.getProductById(id);
        let {title, description, code, price, status, stock, category, thumbnails} = req.body;
        // Si la propiedad no viene en el request, se queda la propiedad anterior
        if (!title) title = oldProd.title;
        if (!description) description = oldProd.description;
        if (!code) code = oldProd.code;
        if(!price) price = oldProd.price;
        if (!status) status = oldProd.status;
        if (!stock) stock = oldProd.stock;
        if (!category) category = oldProd.category;
        if (!thumbnails) thumbnails = oldProd.thumbnails;
        // Creación del producto actualizado y guardado
        const product = new Product(title, description, category ,price, thumbnails, code, stock, status)
        const upProd = await service.updateProduct(id, product);
        if(!upProd) res.status(404).json({msg: `Error al actualizar el producto ${id}`});
        else res.status(200).json(upProd); 
        console.log(upProd);       
    } catch (error) {
        next(error.message);
    }
}
// Borrar producto
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const delProd = await service.deleteProduct(id);
        if(!delProd) res.status(404).json({msg: `Error al borrar el producto ${id}`});
        else res.status(200).json(delProd);
    } catch (error) {
        next(error.message);
    }
}