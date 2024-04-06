import Product from "../dao/Product.js";
import ProductsDto from "../dto/Products.Dto.js"
import ProductsServices from "../services/products.services.js"
import { generateProduct } from "../utils.js";
import { transporter } from '../services/email.service.js';
import config from '../../config.js';

const productsServices = new ProductsServices();
const productsDto = new ProductsDto();

export default class productsController {
    // Obtener todos los productos
    getAllProducts = async (req, res, next) => {
        try {
            const response = await productsDto.getAllProducts();
            res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    // Obtener un producto por ID
    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await productsDto.getProductById(id);
            if (!response) res.status(404).json({ msg: "Poducto no encontrado" })
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    // Añadir un arreglo de productos
    addProduct = async (req, res, next) => {
        try {
            let products;
            const newProds = [];
            let owner;
            req.session.user ? owner = req.session.user.email : owner = 'admin';
            !Array.isArray(req.body) ? products = [req.body]: products = req.body;
            for(let i=0; i < products.length; i++) {
                let { title, description, code, price, status, stock, category, thumbnails } = products[i];
                let product = new Product(title, description, category, price, thumbnails, code, stock, status, owner);
                let newProd = await productsDto.addProduct(product);
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
            const oldProd = await productsDto.getProductById(id);
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
            const product = await productsDto.getProductById(id);
            if ( product.owner !== 'admin' && req.session.user.role === 'admin'){
                // Envío del correo informando del borrado de producto
                const mailOptions = {
                    from: config.USER,
                    to: product.owner,
                    subject: "Producto eliminado por un administrador",
                    html: `
                    <h1>Hola</h1>
                    <p>Te informamos que un administrador ha borrado el siguiente producto: </p>
                    <p>${id}</p>
                    `
                }
                const response = await transporter.sendMail(mailOptions);                
            }
            const delProd = await productsServices.deleteProduct(id);
            if (!delProd) res.status(404).json({ msg: `Error al borrar el producto ${id}` });
            else res.status(200).json(delProd);
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar todos los productos
    deleteProducts = async (req, res, next) => {
        try {
            const delProd = await productsServices.deleteProducts();
            if (!delProd) res.status(404).json({ msg: `Error al borrar los productos` });
            else res.status(200).json(delProd);
        } catch (error) {
            next(error.message);
        }
    }    
    // Módulo de Mocking
    getMocking = (req, res, next) => {
        try {
            const products = [];
            for(let i=0; i < 100; i++){
                products.push(generateProduct());
            }
            res.status(200).send({status: 'success', payload: products});     
        } catch (error) {
            next(error.message);
        }
    }
}
