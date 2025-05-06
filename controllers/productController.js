import Product from "../models/product.js";
import { databaseResponseTimeHistogram } from "../utils/metrics.js";

export async function getProducts(req, res) {
    const metricLabels = {
        operation : "getProducts"
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{
        const products = await Product.find();
        timer({...metricLabels, success : "true"})
        res.json(products);
    }catch(err){
        timer({...metricLabels, success : "false"})
        res.status(500).json("Internal Server Error")
    }    
}

export async function createProduct(req, res) {
    const metricLabels = {
        operation : "createProduct"
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{      
        const product = await Product.create(req.body);
        timer({...metricLabels, success : "true"})
        res.json(product);
    }catch(err){
        timer({...metricLabels, success : "false"})
        res.status(500).json("Internal Server Error")
    }    
}

export async function updateProduct(req, res) {
    const metricLabels = {
        operation : "updateProduct"
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{
        const product = await Product.findOneAndUpdate({productId : req.params.productId}, req.body);
        timer({...metricLabels, success : "true"})
        res.json(product);
    }catch(err){
        timer({...metricLabels, success : "false"})
        res.status(500).json("Internal Server Error")
    }    
}

export async function deleteProduct(req, res) {
    const metricLabels = {
        operation : "deleteProduct"
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try{
        timer({...metricLabels, success : "true"})
        const product = await Product.findOneAndDelete({productId : req.params.productId});
        res.json(product);
    }catch(err){
        timer({...metricLabels, success : "false"})
        res.status(500).json("Internal Server Error")
    }    
}