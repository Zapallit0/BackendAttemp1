import express from 'express';
import { Engineer } from '../models/engineerModel.js';

const router=express.Router();

//Get Sum of the Services done
router.get('/TotalServices',(request,response)=>{
    try{
        Engineer.aggregate([
        {$group:{
            _id:null,
            totalServiciosHechos:{
                $sum:"$NServicios_Hechos"
            }
        }}
    ])
    .then(result=>{
        response.json({
            totalServices:result[0].totalServiciosHechos});
    })
    }
    catch(error){
        console.log(error.mensaje);
        response.status(500).send({message:error.message})
    }
})

//Get the no assinged enginniers
router.get('/unassigned', async(request, response) => {
    try {
        const engineers=await Engineer.find({Asignado:false});
        return response.status(200).json({
            count:engineers.length,
            engineers: engineers
        });
    } catch (error) {
        console.log(error.mensaje);
        response.status(500).send({message:error.menssage})
    }
})

//Get the assinged engineers
router.get('/assigned', async(request, response) => {
    try {
        const engineers=await Engineer.find({Asignado:true});
        return response.status(200).json({
            count:engineers.length,
            engineers: engineers
        });
    } catch (error) {
        console.log(error.mensaje);
        response.status(500).send({message:error.menssage})
    }
})
//Get all the users with master
router.get('/Masters', async(request, response) => {
    try {
        const engineers=await Engineer.find({Grado:"Master"});
        return response.status(200).json({
            count:engineers.length,
            engineers: engineers
        });
    } catch (error) {
        console.log(error.mensaje);
        response.status(500).send({message:error.menssage})
    }
})

//Crear un nuevo ingeniero para 
router.post('/',async(request, response)=>{
    try {
        if(!request.body.nombre||
            !request.body.apellido||
            !request.body.DNI||
            !request.body.NColegioIng||
            !request.body.Profesion||
            !request.body.Grado)
            {
                return response.status(400).send({
                    message:"Manda todos los datos del ingeniero"
                });
            }
            const newEngineer={
                nombre:request.body.nombre,
                apellido:request.body.apellido,
                DNI:request.body.DNI,
                NColegioIng:request.body.NColegioIng,
                Profesion:request.body.Profesion,
                Grado:request.body.Grado
            };
            const engineer=await Engineer.create(newEngineer);
            return response.status(201).send(engineer)

    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: error.message,
        });
    }
})

//Get all the engineers
router.get('/', async(request,response)=>{
    try {
        const engineers=await Engineer.find({});
        return response.status(200).json(
            {
                count: engineers.length,
                engineers:engineers
            }
        );
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:error.message
        });
    }
})

//Get one engineer
router.get('/:id',async(request,response)=>{
    try {
        const {id}=request.params;
        const engineer=await Engineer.findById(id);
        return response.status(200).json(engineer)
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

//Update info Engineer
router.put('/:id',async(request,response)=>{
    try {
        if(!request.body.nombre||
            !request.body.apellido||
            !request.body.DNI||
            !request.body.NColegioIng||
            !request.body.Profesion||
            !request.body.Grado)
            {
                return response.status(400).send({
                    message:"Manda todos los datos del ingeniero"
                });
            }
        const {id}=request.params;
        const result=await Engineer.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).json({message:"Ingeniero no encontrado"})
        }
        return response.status(200).send({message:"Informacion Actualizada"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
})


//Delete a Engineer
router.delete('/:id',async(request,response)=>{
    try {
        const {id}=request.params;
        const result=await Engineer.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:"Ingeniero no encontrado"})
        }
        return response.status(200).send({message:"Ingeniero eliminado correctamente"});
    } catch (error) {
        console.log(error.mensaje);
        response.status(500).send({message:error.menssage})
    }
})



export default router