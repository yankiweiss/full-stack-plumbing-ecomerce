const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "please submit the username and password!" });

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser)
    return res
      .status(401)
      .json({
        message: `ooops, there is no username ${user}\nplease create a account`,
      });

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // JWT
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save()
    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: `${user} You have been Successfully logged in ${accessToken}`,
    });
  } else {
    res
      .status(401)
      .json({ message: "We did not find you username and password" });
  }
};

module.exports = { handleLogin };
