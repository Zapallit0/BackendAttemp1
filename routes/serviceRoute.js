import express from 'express';
import {Service} from  '../models/serviceModel.js';

const router=express.Router();

//Create a new service
router.post('/',async(request,response) => {
    try {
        if(!request.body.nombre||
            !request.body.descripcion||
            !request.body.rubro||
            !request.body.requerimientos||
            !request.body.requerimientos.nombre||
            !request.body.requerimientos.descripcion||
            !request.body.requerimientos.pasos||
            !request.body.duracion||
            !request.body.etapas){
                return response.status(404).send({
                    message:"Mande todos los datos del servicio"
                })
            }
            const newService = {
                nombre: request.body.nombre,
                descripcion: request.body.descripcion,
                rubro: request.body.rubro,
                requerimientos:{
                    nombre: request.body.requerimientos.nombre,
                    descripcion:request.body.requerimientos.descripcion,
                    pasos:request.body.requerimientos.pasos,
                },
                duracion: request.body.duracion,
                etapas: request.body.etapas
            };
            const service=await Service.create(newService)
            return response.status(201).send(service)
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

//Get all Services
router.get('/',async(request,response) =>{
    try {
        const service=await Service.find({});
        return response.status(200).json(
            {services:service}
        );
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:error.menssage,
        })
    }
})

export default router;