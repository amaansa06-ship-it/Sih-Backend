const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

     const { name,email,password } = req.body;

     const isUserAlreadyExist = await userModel.findOne({
          email
     });

     if(isUserAlreadyExist){
          return res.status(400).json({
               message: "User already exists"
          })
     };

     const hashedPassword = await bcrypt.hash(password, 10);


     const user = await userModel.create({
          name,
          email,
          password: hashedPassword
     });

     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});
     
     res.cookie("token" , token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", 
          sameSite: "strict"
     });

     res.status(201).json({
          message: "User registered Sucesfully",
          user: {
               _id: user._id,
               email: user.email,
               name: user.name
          }
     });
}

async function loginUser(req, res) {

     const { email , password } =  req.body ;

     const user = await userModel.findOne({ email });

     if(!user) {
          return res.status(401).json({
               message:"Invalid Email or Password"
          });
     }

     const isPasswordCorrect = await bcrypt.compare(password , user.password);

     if(!isPasswordCorrect) {
          return res.status(401).json({
               message: "Invalid Email or Password"
          });
     }

     const token = jwt.sign({id: user._id,}, process.env.JWT_SECRET, {expiresIn: "1h"});


     res.cookie("token", token , {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
     });

     res.status(200).json({
          message: "Login Successfull",
          user: {
               _id: user._id,
               name: user.name,
               email: user.email,
          }
     });
}

async function getMe(req, res) {
     const user = await userModel.findById(req.user.id).select("-password");

     res.status(200).json({
          user
     });
}

async function logoutUser(req, res) {
     res.clearCookie("token");

     res.status(200).json({
          message: "Logout Successful"
     });
}


module.exports = {
     registerUser,
     loginUser,
     getMe,
     logoutUser
}