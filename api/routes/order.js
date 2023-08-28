const router = require("express").Router();
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create
router.post("/", verifyToken ,async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Put
router.put("/:id", verifyTokenAndAdmin ,async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin ,async (req, res) => {

    try {
        const deletedOrder = await Order.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedOrder);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get
router.get("/find/:userId", async (req, res) => {

    try {
        const order = await Order.findOne({
            userId: req.params.userId
        });
        res.status(200).json(order);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }h
})

//Get All Products
router.get("/findAll", async (req, res) => {

    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;