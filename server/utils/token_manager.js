// utils/token_manager.js  # ฟังก์ชันการจัดการ Token
const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};
