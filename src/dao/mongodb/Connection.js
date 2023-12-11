import {connect} from 'mongoose';

export const MONGO_URL = "mongodb+srv://andrewcei:s572i7TVIKEr8PfK@codercluster.xwoiiio.mongodb.net/?retryWrites=true&w=majority";

export const initMongoDB = async () => {
    try{
        await connect(MONGO_URL);
        console.log('Conectado a la base de datos de Mongo');
    } catch(error){
        console.log(error);
    }
}