// express server
const express = require("express");
const app = express();
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
//everything related to passport
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.session());

const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

//listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));
