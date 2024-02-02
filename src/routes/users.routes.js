import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const userRouter = Router();
const usersController = new UsersController();

// Ruta para obtener todos usuarios
userRouter.get('/', usersController.getAllUsers);
// Ruta para obtener un usuario
userRouter.get('/:uid', usersController.getUserById);
// Ruta para crear usuario
userRouter.post('/', usersController.createUser);
// Actualización de usuario
userRouter.put('/:uid', usersController.updateUser)
// Borrado de un usuario
userRouter.delete('/:uid', usersController.deleteUser);

export default userRouter;
