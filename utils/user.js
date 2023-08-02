const User = require("../models/usersModel");
const UserService = require("./user.service");

module.exports = UserService(User);