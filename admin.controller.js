const userModel = require('../models/user.model');


async function getUsers(req, res) {
     const users = await userModel
     .find()
     .select("-password")
     .sort({ createdAt: -1 });

     res.status(200).json({
          users
     });
}

module.exports = {
     getUsers
}