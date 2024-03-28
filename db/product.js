import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
});

const Product = mongoose.model("products", prodSchema);

export {Product};