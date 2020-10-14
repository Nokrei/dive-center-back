const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
