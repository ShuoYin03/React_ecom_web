const router = require("express").Router();
const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//Create
router.post("/", async (req, res) => {
    try {
        const cart = await Cart.findById(req.body._id);

        if (!cart) {
            const newCart = new Cart({
                userId: req.body._id,
                products: req.body.cart.products,
                quantity: req.body.cart.quantity,
                total: req.body.cart.total
            });
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(req);
    }
})

//Put
router.put("/:id", async (req, res) => {
    try {
        const updatedCart = await Cart.updateOne(
            { userId: req.params.id },
            { $set: req.body },
            { new: true }
        );
        console.log(updatedCart)
        res.status(200).json(updatedCart);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const deletedCart = await Cart.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletedCart);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get
router.get("/find/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        });
        res.status(200).json(cart);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get All Carts
router.get("/findAll", async (req, res) => {

    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;