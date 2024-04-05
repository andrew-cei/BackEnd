import UsersServices from "../services/users.services.js";
import { createHash, isValidPassword } from "../utils.js"
const usersServices = new UsersServices();

export default class UsersDto {
    // Lectura de todos los usuarios
    getAllUsers = async () => {
        try {
            const users = await usersServices.getAllUsers();
            const filteredUsers = [];
            users.forEach((user) => {
                filteredUsers.push({
                    "id": user._id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "age": user.age,
                    "role": user.role
                })
            })
            return filteredUsers;
        } catch (error) {
            console.log(error);
        }
    }
    // Lectura de un usuario
    findUserById = async(uid) => {
        try {
            const user = await usersServices.findUserById(uid);
            const filteredUser = {
                "id": user._id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role
            };
            return filteredUser;
        } catch (error) {
            console.log(error);
        }
    }
}