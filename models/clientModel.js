import mongoose from "moongose";

const clientSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    RUC:{
        type:Number,
        required:true,
    },
    Rubro:{
        type:String,
        required:true,
    },
    Representante:{
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
            validate: {
                validator: function(v) {
                    // Convert to string and check if length is 8
                    return v.toString().length === 8;
                },
                message: props => `${props.value} is 
                not a valid DNI number! DNI 
                number must have 8 digits.`
            }
        }, 
        cargo:{
            type:String,
            required:true,
        }
    },
    Servicios_Pedidos:{
        type:Number,
    },
})

export const Client=mongoose.model('Cliente',clientSchema);