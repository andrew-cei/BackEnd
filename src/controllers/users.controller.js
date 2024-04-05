import UsersServices from "../services/users.services.js";
import UsersDto from "../dto/Users.Dto.js";
import { createHash } from "../utils.js"
import { transporter } from '../services/email.service.js';
import config from '../../config.js';
const usersServices = new UsersServices();
const usersDto = new UsersDto();

export default class UsersController {
    // Lectura de todos los usuarios
    getAllUsers = async (req, res, next) => {
        try {
            const users = await usersDto.getAllUsers();
            if (!users) res.status(404).json({ msg: "Usuario no encontrado" });
            else res.status(200).send(users);
        } catch (error) {
            next(error.message);
        }
    }
    // Lectura de un usuario
    getUserById = async(req, res, next) => {
        const {uid} = req.params;
        try {
            const user = await usersDto.findUserById(uid);
            if(!user) res.status(404).json({ msg: "Usuario no encontrado"});
            else res.status(200).send(user)
        } catch (error) {
            next(error.message);
        }
    }
    // Creación de usuario
    createUser = async (req, res, next) => {
        // Obtención de datos
        let { first_name, last_name, email, age, password, role } = req.body;
        // Verificación de los datos
        if (!first_name || !last_name || !email || !age || !password || !role) {
            return res.status(404).send({ status: "error", error: "Valores faltantes" });
        } else {
            const user = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "age": age,
                "password": createHash(password),
                "role": role
            }
            try {
                const new_user = await usersServices.createUser(user);
                if (!new_user) res.status(404).json({ msg: "Usuario no creado" });
                else return res.status(200).send({ result: 'success', payload: new_user });
            } catch (error) {
                next(error.message);
            }
        }
    }
    // Actualización de un usuario
    updateUser = async (req, res, next) => {
        // Obtención de usuario
        const { uid } = req.params;
        const newUser = {};
        const oldUser = await usersServices.findUserById(uid);
        let { first_name, last_name, email, age, password, role} = req.body;
        // Si la propiedad no viene en el request, se queda la propiedad anterior
        first_name ? newUser.first_name = first_name : newUser.first_name = oldUser.firs_name;
        last_name ? newUser.last_name = last_name : newUser.last_name = oldUser.last_name;
        email ? newUser.email = email : newUser.email = oldUser.email;
        age ? newUser.age = age : newUser.age = oldUser.age;
        password ? newUser.password = password : {};
        role ? newUser.role = role : newUser.role = oldUser.role;
        try {
            const result = await usersServices.updateUser(uid, newUser);
            res.send({ status: "success", payload: result })
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar un usuario
    deleteUser = async (req, res, next) => {
        // Obtención de usuario
        let { uid } = req.params;
        try {
            const result = await usersServices.deleteUser(uid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            next(error.message);
        }
    }
    // Borrar usuarios inactivos
    deleteInactiveUsers = async (req, res, next) => {
        // Obtención de usuarios
        const users = await usersServices.getAllUsers();
        const actualDate = new Date();
        users.forEach(async (user) => {
            // Compara so la diferencia es mayor a dos días
            if(actualDate - user.lastConnection > 172800000){
                // Envío del correo informando del borrado de cuenta
                const mailOptions = {
                    from: config.USER,
                    to: user.email,
                    subject: "Cuenta eliminada por inactividad",
                    html: `
                    <h1>Hola ${user.first_name}</h1>
                    <p>Te informamos que tu cuenta ha sido borrada por inactividad :(</p>
                    `
                }
                const response = await transporter.sendMail(mailOptions);                 
                await usersServices.deleteUser(user._id);
            }
        })
        res.send({ msg: "Usuarios inactivos borrados" });
    }
    // Cambiar rol de usuario
    changeRole = async (req, res,next) => {
        try {
            const { uid } = req.params;
            const user = await usersServices.findUserById(uid);
            if(user.role === 'user'){
                const result = await usersServices.updateUser(uid, {role: 'premium'});
                res.send({status: "success", payload: result});
            }else{
                const result = await usersServices.updateUser(uid, {role: 'user'});
                res.send({status: "success", payload: result});
            }
        } catch (error) {
            next(error.message);
        }
    }
}
