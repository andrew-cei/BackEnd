// Bibliotecas propias
import ProductsService from '../services/products.services.js';
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
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: 'user'
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
        const products = await productsService.getAllProducts();
        const { first_name, last_name, role } = req.session.user;
        res.render('home', { products, first_name, last_name, role});
    }
    // Render de la página de registro
    registerGet = (req, res) => {
        res.render('register');
    }
    // Registro de usuario
    registerPost = async (req, res) => {
        res.redirect('/');
    }
}
