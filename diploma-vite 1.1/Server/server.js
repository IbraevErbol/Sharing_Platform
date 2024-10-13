import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js"
import connectDB from "./Config/db.js"
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;

const app = express() 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())

// app.use('/users', userRoutes);
app.use(userRoutes);


connectDB()

app.listen(PORT, (err) => {
    err? console.log(err) : console.log(`Listening port ${PORT}`)
})


