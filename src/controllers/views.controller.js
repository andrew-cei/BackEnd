// Bibliotecas propias
import UserServices from '../services/users.services.js';
import CartsServices from '../services/carts.services.js';
import ProductsService from '../services/products.services.js';

const usersServices = new UserServices();
const cartsServices = new CartsServices();
const productsService = new ProductsService();

export default class ViewsController{
    // CallBack de GitHub
    gitHubGet = (req,res)=>{
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: '',
            age: '',
            email: req.user.email,
            role: 'user'
        }
        res.redirect('/products');
    }
    // Render de la página login
    loginGet = async (req, res) => {
        res.render('login');
    }
    // Acceso como usuario registrado
    loginPost = async (req, res) => {
        if (!req.user){
            return res.status(400).send({ status: "error", error: "Invalid credentials" });
        }
        const user = await usersServices.findUserByEmail(req.user.email);
        let cart = await cartsServices.getCart(user.cart);
        if (user.cart === null || !cart){
            // Si el usuario no tiene carro, se crea uno
            cart = await cartsServices.createCart();
            await usersServices.updateUser(user._id, {cart: cart._id.toString()});
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: user.role,
            cart: cart._id
        }
        res.redirect('/products');
    }
    // Render de la página de logout
    logoutGet = (req, res) => {
        req.session.destroy(err => {
            if (!err) res.redirect('/');
            else res.send({ status: 'Logout ERROR', body: err });
        })
    }
    // Render de la página de perfíl
    profile = async (req, res) => {
        const { first_name, last_name, role, cart } = req.session.user;        
        const products = await productsService.getAllProducts();
        const total = await this.totalProducts(cart);
        res.render('home', { products, first_name, last_name, role, cart, total});
    }
    // Render de la página de registro
    registerGet = (req, res) => {
        res.render('register');
    }
    // Registro de usuario
    registerPost = async (req, res) => {
        res.redirect('/');
    }
    // Cálculo del total de productos
    totalProducts = async (cid) => {
        let total = 0;
        const userCart = await cartsServices.getCart(cid);
        userCart.products.forEach( (product) => {
            total = total + product.quantity;
        })
        return total;
    }
}
