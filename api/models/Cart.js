const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        userId: { type:String , required:true, unique:true },
        products: [{
            productId:{
                type:String,
                // required:true
            },
            title: { 
                type:String, 
                // required:true 
            },
            img: { 
                type:String, 
                // required:true 
            },
            size: { 
                type: Array,
                // required:true 
            },
            color: { 
                type: Array,
                // required:true 
            },
            quantity: {
                type: Number,
                default: 1,
                // required:true 
            },
            price: {
                type: Number,
                // required:true 
            },
        }],
        quantity: { type: Number },
        total: { type: Number }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);