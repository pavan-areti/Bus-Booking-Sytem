const authMiddleware = require("../middlewares/auth-middleware");
const Bus = require("../models/busModel");

const router = require("express").Router();

// add bus
router.post("/add-bus",authMiddleware, async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ busNumber: req.body.busNumber });
    if (existingBus) {
      return res.send({
        message: `Bus already exists ${req.body.busNumber}`,
        success: false,
        data: null,
      });
    }
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.send({
      message: "Bus added successfully",
      success: true,
      data: savedBus,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

// get all buses
router.post("/get-buses",authMiddleware, async (req, res) => {
    try {
        const buses = await Bus.find();
        console.log(buses);
        res.send({
            message: "Buses fetched successfully",
            success: true,
            data: buses,
        });
    } catch (err) {
        res.send({
            message: err.message,
            success: false,
            data: null,
        });
    }
});

module.exports = router;