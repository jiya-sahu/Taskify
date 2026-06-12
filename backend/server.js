import express from "express";
import {env} from "./config/env.js"
const app = express();

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running",
  });
})
const PORT = env.port;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})

