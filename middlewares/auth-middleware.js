module.exports = (req, res, next) => {
  try {
    if (!req.user) {
      throw { message: "please login" };
    }
    req.userId = req.user._id;
    next();
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
      data: null,
    });
  }
};
