import { Schema, model } from "mongoose";

const cartsCollection = 'carts' // Nombre de la colección en DB

// Construcción del esquema
const cartsSchema = new Schema({
    products: [
        {
            type: String
        }
    ]
})

// Exporta el modelo
export const cartsModel = model(cartsCollection, cartsSchema);