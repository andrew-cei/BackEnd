import {connect} from 'mongoose';
import config from '../../../config.js';

export let MONGO_URL;

switch (config.NODE_ENV) {
    case 'dev':
        MONGO_URL = config.MONGO_ATLAS_URL;
        console.log("Mongo dev")
        break;
    default:
        MONGO_URL = config.MONGO_LOCAL_URL;
        console.log('Mongo local');
        break;
}

export const initMongoDB = async () => {
    try{
        await connect(MONGO_URL);
        console.log('Conectado a la base de datos de Mongo');
    } catch(error){
        console.log(error);
    }
}
