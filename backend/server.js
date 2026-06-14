import express from "express";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/database.js'
import {env} from "./config/env.js"


const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running",
  });
})
const PORT = env.port;

const startServer = async()=>{
  await connectDB();

  app.listen(PORT,()=>{
      console.log(`server is running on port ${PORT}`);
      
  });

};

startServer();


