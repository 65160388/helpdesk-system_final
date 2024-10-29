// hashPassword.js
const bcrypt = require('bcryptjs');

const password = 'adminadmin'; // รหัสผ่านที่ต้องการใช้สำหรับแอดมิน

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed password:', hashedPassword);
});
