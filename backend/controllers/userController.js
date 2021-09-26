const User = require("../models/User");
const userList = require("../models/seed/userList");

module.exports.getUserByUserId_get = async (req, res) => {
  const thisUser = await User.find(req.body);
  console.log(thisUser);
  res.json(thisUser);
};

// module.exports.getAllUsers_get = async (req,res) => {
//     const limit = req.params.limit || 50;
//     const allUsers = await User.find({}).limit(limit);
//     res.json(allUsers);
// };

module.exports.getAllUsers_get = async (req, res) => {
  await User.create(userList, (err, data) => {
    res.json(userList);
  });
};
