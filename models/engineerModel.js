import mongoose from "mongoose";

const engineerSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    DNI:{
        type:Number,
        required:true,
        unique:true,
    },
    NColegioIng:{
        type:Number,
        required:true,
    },
    Profesion:{
        type:String,
        required:true,
    },
    Grado:{
        type:String,
        required:true,
    },
    NServicios_Hechos:{
        type:Number,
        default:0,
    },
    Asignado:{
        type:Boolean,
        default:false,
    }
})

export const Engineer=mongoose.model('Ingeniero',engineerSchema)