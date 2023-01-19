const authMiddleware = require("../middlewares/auth-middleware");
const Bus = require("../models/busModel");

const router = require("express").Router();

// add bus
router.post("/add-bus", authMiddleware, async (req, res) => {
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

// edit bus
router.post("/edit-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body.id, req.body);
    res.send({
      message: "Bus updated successfully",
      success: true,
      data: null,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

// delete bus
router.post("/delete-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body.id);
    res.send({
      message: "Bus deleted successfully",
      success: true,
      data: null,
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
router.post("/get-buses", authMiddleware, async (req, res) => {
  try {
    const buses = await Bus.find();
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

// get bus by id
router.post("/get-bus", authMiddleware, async (req, res) => {
  try {
    const bus = await Bus.findById(req.body.id);
    res.send({
      message: "Bus fetched successfully",
      success: true,
      data: bus,
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
