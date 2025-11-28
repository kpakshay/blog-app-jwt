import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/userRoute.js'
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app=express()
// app.use(cors())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // allow cookies to be sent
}));
app.use(express.json())
const port = process.env.PORT || 3001

// app.post('login',user)

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

// app.get('/',(req,res)=>{
//     res.send("hi")
//     console.log("/// hit")
// })

app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`)
})