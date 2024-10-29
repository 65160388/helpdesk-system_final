const db = require('../config/db');  // ใช้ pool จาก db.js ที่ถูกตั้งค่าแล้ว

// ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
const createUser = async (firstName, lastName, email, hashedPassword, role) => {
  try {
    const sql = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    const [results] = await db.query(sql, [firstName, lastName, email, hashedPassword, role]);  // ใช้ await
    return results;
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;  // ส่ง error กลับไป
  }
};

// ฟังก์ชันสำหรับค้นหาผู้ใช้ตาม email
const findUserByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(sql, [email]);  // ใช้ await
    return rows.length > 0 ? rows[0] : null;  // คืนค่าผู้ใช้ที่พบ หรือ null หากไม่มี
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;  // ส่ง error กลับไป
  }
};

// ฟังก์ชันสำหรับค้นหาผู้ใช้ตาม id
const findUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.query(sql, [id]);  // ใช้ await
    return rows.length > 0 ? rows[0] : null;  // คืนค่าผู้ใช้ที่พบ หรือ null หากไม่มี
  } catch (err) {
    console.error('Error finding user by id:', err);
    throw err;  // ส่ง error กลับไป
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
