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
        const newProd = await service.addProduct(req.body);
        if(!newProd) res.status(404).json({msg: "Error al crear el producto"});
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const upProd = await service.updateProduct(id, req.body);
        if(!upProd) res.status(404).json({msg: `Error al actualizar el producto ${id}`});
        else res.status(200).json(upProd);        
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