import { Router } from 'express';
import { validateLogIn } from '../middlewares/validateMiddleware.js';
import UsersController from '../controllers/users.controller.js';

const userRouter = Router();
const usersController = new UsersController();

// Ruta para obtener todos usuarios
userRouter.get('/', validateLogIn ,usersController.getAllUsers);
// Ruta para obtener un usuario
userRouter.get('/:uid', validateLogIn, usersController.getUserById);
// Ruta para crear usuario
userRouter.post('/', usersController.createUser);
// Actualización de usuario
userRouter.put('/:uid', validateLogIn, usersController.updateUser)
// Borrado de un usuario
userRouter.delete('/:uid', validateLogIn, usersController.deleteUser);
// Ruta para cambiar rol de usuario
userRouter.put('/premium/:uid', usersController.changeRole);

export default userRouter;
