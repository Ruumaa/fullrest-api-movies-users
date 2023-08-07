const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};
//cek kebenaran token yg dikirim
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
