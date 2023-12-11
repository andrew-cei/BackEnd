import UserServices from "../services/user.services.js";
const userService = new UserServices();

export default class UserController {
    // Registro de usuario
    async register(req, res, next){
        try {
            const user = userService.register(req.body);
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
            const user = await userService.login(email, password);
            if(user){
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