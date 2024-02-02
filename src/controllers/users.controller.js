import UsersServices from "../services/users.services.js";
import { createHash, isValidPassword } from "../utils.js"
const usersServices = new UsersServices();

export default class UsersController {
    // Lectura de todos los usuarios
    getAllUsers = async (req, res, next) => {
        try {
            const users = await usersServices.getAllUsers();
            if (!users) res.status(404).json({ msg: "Usuario no encontrado" });
            else res.status(200).send({ result: 'success', payload: users });
        } catch (error) {
            next(error.message);
        }
    }
    // Lectura de un usuario
    getUserById = async(req, res, next) => {
        const {uid} = req.params;
        try {
            const user = await usersServices.findUserById(uid);
            if(!user) res.status(404).json({ msg: "Usuario no encontrado"});
            else res.status(200).send({result:'succes', payload: user})
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
        const oldUser = await usersServices.findUserById(uid);
        const { first_name, last_name, email, age, password, role} = req.body;
        // Si la propiedad no viene en el request, se queda la propiedad anterior
        if (!first_name) first_name = oldUser.first_name;
        if (!last_name) last_name = oldUser.last_name;
        if (!email) email = oldUser.email;
        if (!age) age = oldUser.age;
        if (!password) password = oldUser.password;
        if (!role) role = oldUser.role;
        // Actualización de usuario
        const userToReplace = {
            "firs_name": first_name,
            "last_name":last_name,
            "email":email,
            "age": age,
            "password": createHash(password),
            "role": role
        }
        try {
            const result = await usersServices.updateUser(uid, userToReplace);
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
            res.send({ status: "success", payload: result })
        } catch (error) {
            next(error.message);
        }
    }
}
