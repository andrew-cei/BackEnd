import UserServices from "../services/user.services.js";
import { createHash, isValidPassword } from "../utils.js"
const userService = new UserServices();

export default class UserController {
    // Registro de usuario
    async register(req, res, next){
        try {
            // Password Hash
            const {first_name, last_name, email, age, password } = req.body;
            if(!first_name || !last_name || !email || !age) return res.status(400).send({msg:'Faltan datos'});
            let new_user = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const user = userService.register(new_user);
            if(user) res.redirect('/');
            else res.redirect('/register-error');   
        } catch (error) {
            next(error.message);
        }
    }
    // Login de usuario
    async login(req, res, next){
        try {
            const { email, password } = req.body;
            if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                req.session.firstName = 'Coderhouse';
                req.session.lastName = 'Administrador';
                req.session.role = 'admin';
                res.redirect('/products');                
            }
            const user = await userService.login(email);
            if(user){
                if(!isValidPassword(user,password)) return res.status(403).send({status:'error', error: 'Incorrect password'});
                req.session.firstName = user.first_name;
                req.session.lastName = user.last_name;
                req.session.role = user.role;
                res.redirect('/products');
            }else {
                res.redirect('/error-login');
            }
        } catch (error) {
            next(error.message);
        }
    }
}