const db = require('../config/db'); // เชื่อมต่อกับฐานข้อมูล

// ฟังก์ชันสำหรับดึงข้อมูลคิวทั้งหมด
exports.getAllQueues = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM queues');
        return rows;
    } catch (error) {
        console.error('Error fetching all queues:', error.message);
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลคิว');
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลคิวของผู้ใช้ที่เข้าสู่ระบบ
exports.getQueueByUserId = async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM tickets WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      console.error('Error fetching user queue:', error.message);
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลคิวของผู้ใช้');
    }
};
  

// ฟังก์ชันสำหรับสร้าง Queue ใหม่
// exports.createQueue = async (user_id, name, description) => {
//   try {
//     const [result] = await pool.execute(
//       'INSERT INTO queues (user_id, name, description) VALUES (?, ?, ?)',
//       [user_id, name, description]
//     );
//     return result.insertId; // ส่งคืน queue_id ที่สร้างใหม่
//   } catch (error) {
//     console.error('Error creating queue:', error.message);
//     throw new Error('Error creating queue: ' + error.message);
//   }
// };

