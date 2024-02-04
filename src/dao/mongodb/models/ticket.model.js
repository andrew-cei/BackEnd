import {Schema, model} from "mongoose";

const ticketCollection = 'tickets' // Nombre de la colección en DB

// Construcción del esquema
const ticketSchema = new Schema({
    code: {
        type: Number,
        require: true,
        unique: true        
    },
    purchase_datetime: {
        type: Date,
        require: true
    },
    amount: {
        type: Number,
        require: true,
    },
    purchaser: {
        type: String,
        require: true
    }
})

// Exporta el modelo
export const ticketModel = model(ticketCollection, ticketSchema);