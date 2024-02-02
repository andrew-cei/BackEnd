import UsersDaoDB from "../dao/mongodb/UsersDao.js";

const usersDao = new UsersDaoDB();

export default class UsersServices {
    // Obtener todos los usuarios
    async getAllUsers(){
        try {
            const users = await usersDao.getUsers();
            if(!users) return false;
            else return users;
        } catch (error) {
            console.log(error);
        }
    }
    // Encontrar un usuario por Email
    async findUserByEmail(email) {
        try {
            const user = await usersDao.findUserByEmail(email);
            if(!user) return false;
            else return user;
        } catch (error) {
            console.log(error);
        }
    }
    // Encontrar un usuario por ID
    async findUserById(id) {
        try {
            const user = await usersDao.findUserById(id);
            if(!user) return false;
            else return user;
        } catch (error) {
            console.log(error);
        }
    }
    // Registrar usuario
    async createUser(user) {
        try {
            const { email } = user;
            const exists = await usersDao.findUserByEmail(email);
            if (!exists) return await usersDao.createUser(user);
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar usuario
    async updateUser(uid, user){
        try {
            const exists = await usersDao.findUserById(uid);
            if(exists) return await usersDao.updateUser(uid, user);
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar usuario
    async deleteUser(uid){
        try {
            const exists = await usersDao.findUserById(uid);
            if(exists) return usersDao.deleteUser(uid);
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
    // Login de usuario
    async verifyUserLogin(email) {
        try {
            const userExist = await usersDao.verifyUserLogin(email);
            if (!userExist) return false;
            else return userExist;
        } catch (error) {
            console.log(error);
        }
    }
}
