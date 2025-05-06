import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true,
        unique : true
    },
    name : {
        type: String,
        required: true,
    },
    altNames : {
        type: [String],
        required: true,
        default : []
    },
    description : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    subCategory : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product