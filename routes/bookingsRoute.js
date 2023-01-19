const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const authMiddleware = require("../middlewares/auth-Middleware");
const Bus = require("../models/busModel");

// book seats
router.post("/book-seats", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
       ...req.body,
       transactionId: "123456789",
       user: req.userId,
       totalAmount: req.body.seats.length * 100,
   });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();
    res.send({
      message: "Seats booked successfully",
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

module.exports = router;
