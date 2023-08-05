const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const authMiddleware = require("../middlewares/auth-middleware");
const Bus = require("../models/busModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

// book seats
router.post("/book-seats", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.userId,
      status: "Success",
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

//cancel booking
router.post("/cancel-booking", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    const bus = await Bus.findById(booking.bus);
    //removing the cancelled seats
    for (let i = 0; i < booking.seats.length; i++) {
      let ind = bus.seatsBooked.indexOf(booking.seats[i]);
      bus.seatsBooked.splice(ind, 1);
    }
    await bus.save();

    await Booking.findByIdAndDelete(bookingId);

    res.send({
      message: "Booking Deleted Succesfully",
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
// get user bookings
router.post("/user-bookings", authMiddleware, async (req, res) => {
  try {
    const { user } = req.body;
    const bookings = await Booking.find({ user }).populate("bus").exec();

    res.send({
      message: "bookings fetched succesfully",
      success: true,
      data: bookings,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});
//make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.send({
        message: "Payment successful",
        success: true,
        data: payment,
      });
    } else {
      res.send({
        message: "Payment failed",
        success: false,
        data: null,
      });
    }
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
