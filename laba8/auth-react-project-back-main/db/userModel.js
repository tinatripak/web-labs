const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name : {
    type: String, 
    required: [true, "Please provide a Full Name!"]
  },
  group : {
    type: String, 
    required: [true, "Please provide a Group!"]
  },
  variant : {
    type: String, 
    required: [true, "Please provide a Variant!"]
  },
  phone : {
    type: String, 
    required: [true, "Please provide a Phone!"], 
    unique: [true, "Phone Exists"]
  },
  photo : {
    type: String, 
    required: [true, "Please provide a Photo!"]
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"]
  },
  role: {
    type: String,
    required: [true, "Please provide a Role!"]
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
