import express, { request } from "express";
import { PORT,mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import engineerRoute from './routes/engineerRoute.js';
import clientRoute from './routes/clientsRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import solutionRoute from './routes/solutionsRoute.js';


import cors from 'cors';

const app = express();

app.use(express.json());
// Option 1 to add cors
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors(
//     {
//         origin:"http://localhost:3000",
//         methods:['GET', 'POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     }
// ))
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Jhers')
});

app.use('/books', booksRoute);
app.use('/engineers',engineerRoute);
app.use('/clients', clientRoute);
app.use('/services',serviceRoute)
app.use('/solutions', solutionRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to the database');
        app.listen(PORT,()=>{
            console.log(`App listening on port ${PORT}`);
            })
    })
    .catch((error)=>{
        console.log(error)
    })


