import { Router } from 'express';
import { validateAdmin } from "../middlewares/validateAdmin.js";
import UsersController from '../controllers/users.controller.js';

const userRouter = Router();
const usersController = new UsersController();

// Ruta para obtener todos los usuarios
userRouter.get('/', validateAdmin, usersController.getAllUsers);
// Ruta para obtener un usuario
userRouter.get('/:uid', validateAdmin, usersController.getUserById);
// Ruta para crear usuario
userRouter.post('/', validateAdmin, usersController.createUser);
// Actualización de usuario
userRouter.put('/:uid', validateAdmin, usersController.updateUser)
// Ruta para cambiar rol de usuario
userRouter.put('/premium/:uid', validateAdmin, usersController.changeRole);
// Borrado de un usuario
userRouter.delete('/:uid', validateAdmin, usersController.deleteUser);
// Borrado de usuarios inactivos
userRouter.delete('/', validateAdmin, usersController.deleteInactiveUsers);

export default userRouter;
