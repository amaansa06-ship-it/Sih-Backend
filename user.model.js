const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Name is required for creating account"],
          trim: true 
     },
     email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
          trim: true,
          lowercase: true,
          match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Address"]
     },
     password: {
          type: String,
          required: [true, "Password is required for creating an account"],
          minlength: [6, "Password should contain at least 6 characters"]
     },
     role: {
          type: String,
          enum: ["operator", "admin"],
          default: "operator"
     }
}, {
  timestamps: true,
});


const userModel = mongoose.model("user" , userSchema);

module.exports = userModel