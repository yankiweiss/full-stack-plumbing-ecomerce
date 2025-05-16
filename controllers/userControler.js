const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return res.status(200).json({ message: "No items were found" });
  }
  res.json(users);
};

module.exports = {
  getAllUsers,
};
