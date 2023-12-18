import passport from "passport";
import local from 'passport-local';
import UserServices from "../services/user.services.js";
import { createHash, isValidPassword } from '../utils.js';

const userServices = new UserServices();
const LocalStrategy = local.Strategy;
const initializePassport = () => {
    // Inicialización de la estrategia local
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                // Búsqueda y creación de usuario
                let user = await userServices.findByEmail(username);
                if (user) {
                    console.log('El usuario ya existe');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userServices.register(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error al obtener el usuario: ' + error);
            }
        }
    ))
    // Funciones de serialización y deserialización fuera de la estrategia local
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userServices.findById(id);
        done(null, user);
    });
    // Estrategia de login
    passport.use('login', new LocalStrategy({ usernameField: 'email'}, async(username, password, done)=> {
    try {
        const user = await userServices.findByEmail(username);
        if (!user) {
            console.log("User doesn't exist");
            return done(null, false);
        }
        if(!isValidPassword(user,password)) return done(null, false);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}))
}

export default initializePassport;