const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const authMiddleware = require("../middlewares/auth-Middleware");
const Bus = require("../models/busModel");
const stripe = require("stripe")(process.env.STRIPE_KEY)
const uuid = require("uuid")

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

//make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
       const {token,amount} = req.body;
       const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: amount,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
        }, {
            idempotencyKey: uuid()
        })

        if(payment){
          res.send({
            message: "Payment successful",
            success: true,
            data: payment,
          });
        }
        else{
          res.send({
            message: "Payment failed",
            success: false,
            data: null,
          });
        }

        
  }
  catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
