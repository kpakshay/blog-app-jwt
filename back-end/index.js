import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/userRoute.js'
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config()

const app=express()

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json())

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 3001

const connectDb= async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo DB connected")
    }catch(err){
        console.log(`Error : ${err.message}`)
    }

}

connectDb()

app.use('/get',(req,res)=>{console.log("hiii76")
    res.send("Hii")
})
app.use('/api/users',userRoutes)
app.use("/api/posts", postRoutes);

app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`)
})