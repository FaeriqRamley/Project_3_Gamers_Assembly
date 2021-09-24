const User = require("../models/User");

module.exports.getUserByUserId_get = async (req,res) => {
    const thisUser = await User.findById(req.params.id);
    res.json(thisUser);
};

module.exports.getAllUsers_get = async (req,res) => {
    const limit = req.params.limit || 50;
    const allUsers = await User.find({}).limit(limit);
    res.json(allUsers);
};