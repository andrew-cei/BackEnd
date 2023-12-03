import {Schema, model} from "mongoose";

const userCollection = 'usuarios' // Nombre de la colección en DB

// Construcción del esquema
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
})

// Exporta el modelo
export const userModel = model(userCollection, userSchema);