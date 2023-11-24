import {Schema, model} from "mongoose";

const productCollection = 'products' // Nombre de la colección en DB

// Construcción del esquema
const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number
})

// Exporta el modelo
export const productModel = model(productCollection, productSchema);