const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already registered"],
    },
    firstName: String,
    lastName: String,
    profilePhoto: String,
    password: String,
    source: {
      type: String,
      required: [true, "source not specified"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
