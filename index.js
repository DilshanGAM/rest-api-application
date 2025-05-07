import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./routers/productRouter.js";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics.js";
import responseTime from "response-time";
import cors from "cors";

dotenv.config()
mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("Connected to database")
    }
)


const app = express()

app.use(cors())


app.use(responseTime(
    (req,res,time)=>{
        if(req?.baseUrl){
            restResponseTimeHistogram.observe({
                method : req.method,
                route : req.baseUrl,
                status_code : res.statusCode
            },  time * 1000)
        }
        
    }
))
app.use(bodyParser.json())

app.use("/api/product",productRouter)
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})
startMetricsServer()