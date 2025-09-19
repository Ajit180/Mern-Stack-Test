import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export default  async function connectdb(){
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to mongodb database environment")
    } catch (error) {
        console.log("Error in Connecting the database",error);
    }
}