import mongoose from "mongoose";
const solutionSchema=mongoose.Schema({
    engineer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingeniero',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    specifications: {
        type: String,
        required: true
    }
})

export const Solution=mongoose.model('Solution',solutionSchema);