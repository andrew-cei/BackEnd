import { userModel } from "../dao/mongodb/models/user.model.js";

export default class UserServices {
    // Encontrar un usuario por Email
    async findByEmail(email){
        return await userModel.findOne({email})
    }
    // Encontrar un usuario por ID
    async findById(id){
        return await userModel.findOne({_id:id})
    }    
    // Registrar usuario
    async register(user){
        try {
            const { email } = user;
            const exists = await this.findByEmail(email);
            if(!exists) return await userModel.create(user);
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
    // Login de usuario
    async login(email){
        try {
            const userExist = await userModel.findOne({email});
            if(!userExist) return false;
            else return userExist;
        } catch (error) {
            console.log("Error",error);
        }
    }
}