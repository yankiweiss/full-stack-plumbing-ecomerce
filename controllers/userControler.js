const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return res.status(200).json({ message: "No items were found" });
  }
  res.json(users);
};

const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;   

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Missing either the username, password, or email" });
    }
    

      const result = await User.create({ username, email, password });

    res.status(201).json({ message: "Item created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getAllUsers,
  createNewUser
};
