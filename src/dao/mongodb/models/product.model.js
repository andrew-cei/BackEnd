import {Schema, model} from "mongoose";

const productCollection = 'products' // Nombre de la colección en DB

// Construcción del esquema
const productSchema = new Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: [],
})

// Exporta el modelo
export const productModel = model(productCollection, productSchema);