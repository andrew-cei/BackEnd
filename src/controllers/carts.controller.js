import CartsServices from "../services/carts.services.js";
import ProductService from "../services/products.services.js";
import CartsDto from "../dto/Carts.Dto.js";

const productService = new ProductService();
const cartsServices = new CartsServices();
const cartsDto = new CartsDto();

export default class CartsController {
    // Obtener todos los carritos
    getAllCarts = async (req, res, next) => {
        try {
            const response = await cartsDto.getAllCarts();
            res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    // Obtener un carrito
    getCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await cartsDto.getCart(cid);
            if (!response) res.status(404).json({ msg: `Carrito ${id} no encontrado` });
            else res.status(200).json(response);
        } catch (error) {
            next(error.message)
        }
    }
    // Crear un carrito
    createCart = async (req, res, next) => {
        try {
            const response = await cartsDto.createCart();
            if (!response) res.status(404).send('Carrito no creado');
            else res.status(200).json({ msg: 'Carrito creado' });
        } catch (error) {
            next(error.message)
        }
    }
    // Agregar un producto al carrito
    addProductToCart = async (req, res, next) => {
        try {
            let quantity;
            const { cid, pid } = req.params;
            const producto = await productService.getProductById(pid);
            const carrito = await cartsDto.getCart(cid);
            if (!producto) res.status(404).send(`Producto ${pid} no encontrado`);
            if (!carrito) res.status(404).send(`Carrito ${cid} no encontrado`);
            else {
                // Verifica si el producto ya está en el carrito y actualiza su cantidad
                let response;
                let existe = false;
                carrito.products.forEach(async element => {
                    if (element._id.toString() === pid) {
                        quantity = element.quantity;
                        existe = true;
                    }
                });
                if (existe) {
                    response = await cartsDto.updateQuantityProduct(cid, pid, quantity + 1);
                } else {
                    response = await cartsDto.addProductToCart(cid, pid);
                }
                if (!response) res.status(404).send(`No se añadió ${pid} al carrito ${cid}`);
                else res.status(200).json({ msg: `Carrito ${cid} actualizado` });
            }
        } catch (error) {
            next(error.message);
        }
    }
    // Actualizar productos del carrito
    updateProductsInCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const codes = [];
            const productos = [];
            // Creación de un arreglo de productos no repetidos
            products.forEach(async element => {
                if (!codes.includes(element._id)) {
                    element.quantity = 1;
                    codes.push(element.id);
                    // Se guarda el producto no repetido
                    productos.push(element);
                    // Se guarda el nuevo producto
                    await productService.addProduct(element);
                } else {
                    // Se aumenta en uno la cantidad del producto repetido
                    const index = codes.indexOf(element._id);
                    productos[index].quantity++;
                }
            });
            console.log(productos)
            const cart = await cartsDto.updateProductsInCart(cid, productos);
            if (!cart) res.status(404).send(`Carrito ${cid} no actualizado`);
            else res.status(200).json({ msg: `Carrito ${cid} actualizado` });
        } catch (error) {
            next(error.message);
        }
    }
    // Actualizar cantidad de producto al carrito
    updateQuantityProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await cartsDto.updateQuantityProduct(cid, pid, quantity);
            if (!cart) res.status(404).send(`Carrito ${cid} no actualizado`);
            else res.status(200).json({ msg: `Carrito ${cid} actualizado` });
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar un carrito
    delCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await cartsServices.delCart(cid);
            if (!response) res.status(404).send(`Carrito ${cid} no borrado`);
            else res.status(200).json({ msg: `Carrito ${cid} borrado` });
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar todos los productos de un carrito
    delAllProducts = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await cartsServices.delAllProducts(cid);
            if (!response) res.status(404).send(`No se borraron todos los productos del carrito ${cid}`);
            else res.status(200).json({ msg: `Se borraron los productos del carrito ${cid}` });
        } catch (error) {
            next(error.message)
        }
    }
    // Borrar un producto de un carrito
    delOneProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const response = await cartsServices.delOneProduct(cid, pid);
            if (!response) res.status(404).send(`No se pudo borrar ${pid} del carrito ${cid}`);
            else res.status(200).json({ msg: `Se borró ${pid} del carrito ${cid}` });
        } catch (error) {
            next(error.message);
        }
    }
}
