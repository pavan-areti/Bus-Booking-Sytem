const router = require("express").Router();
const User = require("../models/usersModel");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");

const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({
    id,
  });
  done(null, currentUser);
});

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

//google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "google";
      User.findOrCreate(
        { id, email, firstName, lastName, profilePhoto, source },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

//facebook strategy
// TODO: after approval of this change the values of fields
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/users/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        const id = profile.id;
        const email = profile.emails[0].value;
        const firstName = profile.displayName;
        const lastName = "";
        const profilePhoto = "";
        const source = "facebook";
        await User.findOrCreate(
          { id, email, firstName, lastName, profilePhoto, source },
          function (err, user) {
            if (err) {
              return done(null, false, {
                message: `You have previously signed up with a different signin method`,
              });
            } else {
              return done(null, user);
            }
          }
        );
      } catch (err) {
        return res.send({
          message: err.message,
          success: false,
          data: null,
        });
      }
    }
  )
);

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
      { userId: existingUser._id },
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

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
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

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        res.send({
          message: err.message,
          success: false,
          data: null,
        });
      }
      res.redirect("/");
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

router.post("/is-auth", authMiddleware, async (req, res) => {
  try {
    res.send({
      message: "user is authenticated",
      success: true,
      data: req.user,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
});

//routes to handle google
router.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/",
    successRedirect: "/",
  })
);

//routes to handle facebook
router.get(
  "/login/federated/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  }),
   (req, res) => {
    console.log(res);
  }
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/",
    successRedirect: "/",
  })
  , (req, res) => {
    console.log(res);
  }
);

module.exports = router;
