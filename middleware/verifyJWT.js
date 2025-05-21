const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ message: "missing the Tokens" });

  console.log(authHeader);

  const token = authHeader && authHeader.startsWith("Bearer ")

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if(err) return res.status(403).json({"message": "Token had expired"});
        req.user = decoded.username;
        next()
    }
  )
};

module.exports = verifyJWT;

