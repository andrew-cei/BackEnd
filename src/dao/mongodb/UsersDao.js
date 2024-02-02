import {userModel} from './models/user.model.js';

// Manejador de usuarios
export default class UsersDaoDB{
    constructor(){
        this.users='';
    }
    // Obtener todos los usuarios
    async getUsers(){
        try {
            this.users = await userModel.find();
            return this.users;
        } catch (error) {
            console.log(error);
        }
    }
    // Encontrar usuario por Email
    async findUserByEmail(email){
        try {
            this.users = await userModel.findOne({email});
            return this.users;
        } catch (error) {
            console.log(error);
        }
    }
    // Encontrar usuario por ID
    async findUserById(id){
        try {
            this.users = userModel.findOne({_id:id});
            return this.users;
        } catch (error) {
            console.log(error);
        }
    }
    // Crear usuario
    async createUser(user){
        try {
            return await userModel.create(user);
        } catch (error) {
            console.log(error);
        }
    }
    // Actualizar Usuario
    async updateUser(uid, user){
        try {
            return await userModel.updateOne({ _id: uid }, user);
        } catch (error) {
            console.log(error);
        }
    }
    // Borrar usuario
    async deleteUser(uid){
        try {
            return await userModel.deleteOne({_id:uid});
        } catch (error) {
            console.log(error);
        }
    }
    // Verificar si un usuario está logeado
    async verifyUserLogin(email){
        try {
            const userExist = await userModel.findOne({email});
            if(!userExist) return false;
            else return userExist;
        } catch (error) {
            console.log(error);
        }
    }
}
