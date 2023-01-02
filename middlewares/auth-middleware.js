const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        message: "User not authenticated",
        success: false,
        data: null,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
};
