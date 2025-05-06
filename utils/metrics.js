import express from "express";
import client from "prom-client"

const app = express()

export const restResponseTimeHistogram = new client.Histogram({
    name : "rest_response_time_duration_seconds",
    help : "Duration of REST API requests in seconds",
    labelNames : ["method","route","status_code"]
})

export const databaseResponseTimeHistogram = new client.Histogram({
    name : "db_response_time_duration_seconds",
    help : "Database response time in seconds",
    labelNames : ["operation","success"]
})

export function startMetricsServer(){
    const collectDefaultMetrics = client.collectDefaultMetrics
    collectDefaultMetrics()
    
    app.get("/metrics",async (req,res)=>{
        res.setHeader("Content-Type",client.register.contentType)
        return res.send(await client.register.metrics())
    })
    app.listen(9100,()=>{
        console.log("Server is running on port 9100")
    })
}