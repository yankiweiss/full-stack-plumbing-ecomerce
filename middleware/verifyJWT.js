const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ message: "missing the Tokens" });

  console.log(authHeader);

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if(err) return res.status(403).json({"message": "Token had expired"});
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles
        next()
    }
  )
};

module.exports = verifyJWT;

