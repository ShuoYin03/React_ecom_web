const router = require("express").Router();
const Product = require('../models/Product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create
router.post("/", verifyTokenAndAdmin ,async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Put
router.put("/:id", verifyTokenAndAdmin ,async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin ,async (req, res) => {

    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedProduct);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get
router.get("/find/:id", async (req, res) => {

    try {
        const product = await Product.findById(
            req.params.id
        );
        res.status(200).json(product);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get All Products
router.get("/", async (req, res) => {

    const queryNew = req.query.new;
    const queryCategories = req.query.categories;
    try {
        let products;

        if (queryNew) {
            products = await Products.find().sort({ createdAt: -1 }).limit(1);
        } else if (queryCategories) {
            products = await Products.find({
                $in: [queryCategories]
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;