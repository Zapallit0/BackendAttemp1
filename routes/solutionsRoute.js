import express, { request } from "express";
import { Solution } from "../models/solutionModel.js";
import { Engineer } from "../models/engineerModel.js";
const router=express.Router();

// Creating a new solution
router.post('/',async(request,response) => {
    try {
        if(!request.body.engineer||
            !request.body.client||
            !request.body.service||
            !request.body.specifications){
                return response.status(400).send({
                    message:"Manda todos los datos del servicio"
                })
            };
            const engineer = await Engineer.findById(request.body.engineer);
            if (engineer.Asignado) {
                return response.status(400).send({
                    message: "El ingeniero ya está ocupado"
                });
            }
            const newSolution={
                engineer:request.body.engineer,
                client:request.body.client,
                service:request.body.service,
                specifications:request.body.specifications
            };  
                const solution =await Solution.create(newSolution);
                await Engineer.findByIdAndUpdate(solution.engineer, { Asignado: true});
                return response.status(201).send(solution);
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: error.message,
        });
    }
})

//Get all the solutions
router.get('/',async(request, response)=>{
    try {
        const solutions=await Solution.find({})
        .populate('engineer','nombre')
        .populate('client','nombre')
        .populate('service','nombre')
        return response.status(200).json(
            {
                count: solutions.length,
                solutions:solutions
            }
        );
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:error.message
        });
    }
})

export default router