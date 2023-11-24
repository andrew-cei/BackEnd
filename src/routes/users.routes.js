import {Router} from 'express';
import {userModel} from '../dao/models/user.model.js';

const userRouter = Router();

userRouter.get('/', async (req,res)=>{
    // Lectura de usuarios
    try{
        let users = await userModel.find();
        res.send({result:'success', payload:users});
    }catch(error){
        console.log("No se pueden obtener los usuarios con mongoose"+error);
    }
})

userRouter.post('/', async (req,res)=>{
    // Obtención de datos
    let {first_name, last_name, email} = req.body;
    // Verificación de los datos
    if(!first_name||!last_name||!email)
    {
        return res.send({status:"error",error:"Valores faltantes"});
    }
    // Añadir el usuario
    try{
        let result = await userModel.create({
            first_name,
            last_name,
            email
        })
        // Usuario recién creado
        res.send({status:"success",payload:result})
    }catch(error){
        console.log("No se puede crear el usuario con mongoose"+error);
    }
})

userRouter.put('/:uid', async(req,res)=>{
    // Obtención de usuario
    let {uid} = req.params;
    let userToReplace = req.body;
    // Verificación de datos
    if(!userToReplace.first_name||!userToReplace.last_name||!userToReplace.email)
    {
        return res.send({status:"error",error:"Valores incompletos"})
    }
    // Actualización de usuario
    try{
        let result = await userModel.updateOne({_id:uid},userToReplace)
        res.send({status:"success",payload:result})
    }catch(error){
        console.log("No se puede actualizar el usuario con mongoose"+error);
    }
})

userRouter.delete('/:uid', async(req,res)=>{
    // Obtención de usuario
    let {uid} = req.params;
    try{
        let result = await userModel.deleteOne({_id:uid})
        res.send({status:"success",payload:result})
    }catch(error){
        console.log("No se puede borrar el usuario con mongoose"+error);
    }
})

export default userRouter;