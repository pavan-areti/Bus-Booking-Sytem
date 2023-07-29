const router = require("express").Router();
const User = require("../models/usersModel");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");

// register new user
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await brcypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.send({
        message: "User does not exist create an account",
        success: false,
        data: null,
      });
    }

    const isPasswordCorrect = await brcypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.send({
        message: "Incorrect User Credentials",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign(
      { userId : existingUser._id },
        process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.send({
        message: "User logged in successfully",
        success: true,
        data: token,
        });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

router.post("/get-user-by-id",authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(user){
            res.send({
                message: "User found",
                success: true,
                data: user,
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
