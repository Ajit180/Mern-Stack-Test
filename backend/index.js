import express from 'express'
import apiRoutes from './routes/userroute.js'
import connectdb from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import Routestatement from '../backend/routes/statementroute.js'
dotenv.config();



const app =express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT

app.use('/api',apiRoutes);
app.use('/api',Routestatement);



app.listen(PORT,()=>{
    console.log(`The server running on the port ${PORT}`)
    connectdb()
})