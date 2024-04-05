// Bibliotecas propias de Express
import passport from 'passport';
import { Router } from 'express';
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import { validateAdmin } from '../middlewares/validateAdmin.js';
// Bibliotecas propias
import ViewsController from '../controllers/views.controller.js';
// Creación de variables
const viewsRouter = Router();

const viewsController = new ViewsController();

// Acceso a login
viewsRouter.get('/', viewsController.loginGet);
// Prueba del logger
viewsRouter.get('/loggerTest', validateAdmin, viewsController.loggerTest);
// Registro de usuario
viewsRouter.get('/register', viewsController.registerGet);
// Regenerar contraseña vista
viewsRouter.get('/recover', viewsController.recoverGet);
// Regenerar contraseña envío de correo
viewsRouter.post('/recover', viewsController.recoverPost);
// Generar nueva contraseña vista
viewsRouter.get('/changePass/:email', viewsController.changePassGet);
// Generar nueva constraseña en base de datos
viewsRouter.post('/changePass', viewsController.changePassPost);
// Perfil de usuario con productos
viewsRouter.get('/profile', validateLogIn , viewsController.profile);
// Perfil de administrador
viewsRouter.get('/admin', validateAdmin, viewsController.admin);
// Logout de usuario
viewsRouter.get('/logout', viewsController.logoutGet);
// Ruta hacia el registro de usuario
viewsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register-error' }), viewsController.registerPost);
// Ruta hacia el login de usuario
viewsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/error-login' }), viewsController.loginPost);
// Ruta hacia el registro mediante GitHub
viewsRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
// Callback URL
viewsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), viewsController.gitHubGet);

// Error al registrar
viewsRouter.get('/register-error', (req, res) => {
    res.render('register-error');
})
// Error al acceder (login)
viewsRouter.get('/error-login', (req, res) => {
    res.render('error-login');
})
// Productos en tiempo real
viewsRouter.get('/realtimeproducts', validateLogIn, (req, res) => {
    const { first_name, last_name, role } = req.session.user;        
    const admin = role === 'admin';
    res.render('realTimeProducts', { first_name, last_name, role, admin});
})

export default viewsRouter;
