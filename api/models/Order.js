const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                title: { 
                    type:String, 
                    required:true 
                },
                img: { 
                    type:String, 
                    required:true 
                },
                size: { 
                    type: Array 
                },
                color: { 
                    type: Array 
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                },
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema)