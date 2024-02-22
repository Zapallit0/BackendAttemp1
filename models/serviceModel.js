import mongoose from "mongoose";

const serviceSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    rubro:{
        type:String,
        required:true,
    },
    requerimientos:{
        nombre:{
            type:String,
            required:true,
        },descripcion:{
            type:String,
            required:true,
        },pasos:{
            type:Number,
            required:true,
        }
    },
    duracion:{
        type:Number,
        required:true,
    },
    etapas:{
      type:Number,
      required:true,  
    }
})

export const Service=mongoose.model('Servicio',serviceSchema);