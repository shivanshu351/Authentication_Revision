import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async ()=>{
    try
    {
        const conn = mongoose.connect(process.env.MONGO_URI);
    }   
    catch(e)
    {
        console.log("Connection error has occured");
    }

}

export default connectDb;