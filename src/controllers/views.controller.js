// Bibliotecas propias
import UserServices from '../services/users.services.js';
import CartsServices from '../services/carts.services.js';
import ProductsService from '../services/products.services.js';
import { transporter } from '../services/email.service.js';
import config from '../../config.js';
import { createHash, isValidPassword } from '../utils.js';

const usersServices = new UserServices();
const cartsServices = new CartsServices();
const productsService = new ProductsService();

export default class ViewsController{
    // CallBack de GitHub
    gitHubGet = async (req,res)=>{
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        const user = await usersServices.findUserByEmail(req.user.email);
        let cart = await cartsServices.getCart(user.cart);
        if (user.cart === null || !cart){
            // Si el usuario no tiene carro, se crea uno
            cart = await cartsServices.createCart();
            await usersServices.updateUser(user._id, {cart: cart._id.toString()});
        }        
        req.session.user = {
            first_name: req.user.first_name,
            last_name: '',
            age: '',
            email: req.user.email,
            role: 'user',
            cart: cart._id
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
        const admin = role === 'admin';
        res.render('home', { products, first_name, last_name, role, cart, total, admin});
    }
    // Render de la página de registro
    registerGet = (req, res) => {
        res.render('register');
    }
    // Registro de usuario
    registerPost = async (req, res) => {
        res.redirect('/');
    }
    // Render de la página de regeneración de contraseña
    recoverGet = (req, res) => {
        res.render('recover');
    }
    // Regeneración de contraseña envío de email
    recoverPost = async (req, res) => {
        const { email } = req.body;
        const user = await usersServices.findUserByEmail(email);
        if (user){
            const { _id } = user;
            const date = new Date().getTime();
            const hour = 3600000;
            await usersServices.updateUser(_id, {lastRecovery: date + hour});
            const mailOptions = {
                from: config.USER,
                to: user.email,
                subject: "Recuperación de contraseña",
                html: `
                <p>Puedes generar una nueva contraseña al presionar el botón</p>
                <a href='http://localhost:8080/changePass/${user.email}'>Regenerar contraseña</a>
                `
            }
            const response = await transporter.sendMail(mailOptions);
            console.log(response);
            res.status(200).redirect('/');
        } else{
            res.json({msg: 'Cuenta no encontrada'});
        }
    }
    // Formulario de cambio de contraseña
    changePassGet = async (req, res) => {
        const { email } = req.params;
        const user = await usersServices.findUserByEmail(email);
        if(user.lastRecovery > Date.now()){
            const { first_name, last_name } = user;
            res.render('changePass', { first_name, last_name, email});
        } else {
            res.redirect('/recover');
        }
    }
    // Actualización de contraseña en base de datos
    changePassPost = async (req, res) => {
        const { email, password } = req.body;
        const user = await usersServices.findUserByEmail(email);
        if(!isValidPassword(user, password)){
            const { _id } = user;
            await usersServices.updateUser(_id, {password: createHash(password)});
            res.redirect('/');
        } else {
            res.json({msg: 'Esa contraseña ya se está utilizando'});
        }
    }
    // Cálculo del total de productos
    totalProducts = async (cid) => {
        let total = 0;
        const userCart = await cartsServices.getCart(cid);
        console.log(userCart)
        userCart.products.forEach( (product) => {
            total = total + product.quantity;
        })
        return total;
    }
    // Prueba del logger
    loggerTest = (req, res) => {
        console.log('Hola')
        req.logger.fatal('Error Fatal');
        req.logger.error('Error');
        req.logger.warning('Warining');
        req.logger.info('Info');
        req.logger.http('Http')
        req.logger.debug('Debug');
        res.status(200).json({msg:'Pruebas realizadas'});
    }
}
