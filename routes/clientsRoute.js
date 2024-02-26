import express from 'express';
import {Client} from '../models/clientModel.js';

const router = express.Router();

//Create new client
router.post('/',async(request, response) => {
    try {
        if(!request.body.nombre||
            !request.body.RUC||
            !request.body.Rubro||
            !request.body.Representante.nombre||
            !request.body.Representante.apellido||
            !request.body.Representante.DNI||
            !request.body.Representante.cargo)
            {
                return response.status(400).send({
                    message:"Manda todos los datos del cliente"
                })
            };
            const newClient ={
                nombre:request.body.nombre,
                RUC:request.body.RUC,
                Rubro:request.body.Rubro,
                Representante:{
                    nombre:request.body.Representante.nombre,
                    apellido:request.body.Representante.apellido,
                    DNI:request.body.Representante.DNI,
                    cargo:request.body.Representante.cargo,
                },
                Servicios_Pedidos:request.body.Servicios_Pedidos,
            };
            const client=await Client.create(newClient);
            return response.status(201).send(client)
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:error.menssage,
        });
    }
})

//Get all the clients
router.get('/', async(request, response) => {
    try {
        const client=await Client.find({});
        return response.status(200).json(
            {
                count: client.length,
                clients:client
            }
        );
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:error.menssage,
        })
    }
})

//Get one client
router.get('/:id',async(request, response) => {
    try {
        const {id}=request.params;
        const client=await Client.findById(id);
        return response.status(200).json(client)
    } catch (error) {
        console.log(error);
        response.status(500).send({
        menssage:error.menssage,
        });
    }
})

//Actualizar información de un cliente
router.put('/:id',async(request, response) => {
    try {
        if(!request.body.nombre||
            !request.body.RUC||
            !request.body.Rubro||
            !request.body.Representante.nombre||
            !request.body.Representante.apellido||
            !request.body.Representante.DNI||
            !request.body.Representante.cargo)
            {
                return response.status(400).send({
                    message:"Manda todos los datos del Cliente"
                });
            }const {id}=request.params;
            const result=await Client.findByIdAndUpdate(id,request.body)
            if(!result){
                return response.status(404).json({message:"Cliente no encontrado"})
            }
            return response.status(200).send({message:"Informacion del Cliente Actualizada"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

//Delete one client
router.delete('/:id',async(request,response)=>{
    try {
        const {id}=request.params;
        const result=await Client.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:"Cliente no encontrado"})
        }
        return response.status(200).send({message:"Cliente Eliminado Correctamentee"});
    } catch (error) {
        console.log(error.mensaje);
        response.status(500).send({message:error.menssage})
    }``
})

export default router;


