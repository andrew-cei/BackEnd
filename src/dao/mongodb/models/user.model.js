import {Schema, model} from "mongoose";

const userCollection = 'usuarios' // Nombre de la colección en DB

// Construcción del esquema
const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: String,
        default: null
    },
    isGitHub: {
        type: Boolean,
        default: false
    },
    lastRecovery: {
        type: Date,
        default: null
    }
})

// Exporta el modelo
export const userModel = model(userCollection, userSchema);