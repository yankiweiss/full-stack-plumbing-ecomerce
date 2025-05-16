const User = require("../model/User");

const path = require("path");
const bcrypt = require("bcryptjs");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate)
    return res
      .status(409)
      .json({
        message: `there is already a user with ${user}, Please choose another username`,
      });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

  

    res.status(201).json({ message: `${user}, was created ` });
  } catch (error) {
    console.error(error).json({ message: error.message });
  }
};

module.exports = { handleNewUser };

