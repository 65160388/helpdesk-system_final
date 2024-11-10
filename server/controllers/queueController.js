const ticketModel = require('../models/ticketModel');
const queueModel = require('../models/queueModel');


// ฟังก์ชันสำหรับดึงข้อมูลคิวทั้งหมด
exports.getQueueList = async (req, res) => {
    try {
        const queues = await queueModel.getAllQueues(); // ดึงข้อมูลคิวทั้งหมดจาก model
        res.status(200).json(queues);
    } catch (error) {
        console.error('Error fetching queues:', error.message); // เพิ่ม log ข้อผิดพลาด
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคิว' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลคิวของผู้ใช้ที่เข้าสู่ระบบ
exports.getMyQueue = async (req, res) => {
    try {
        const userId = req.user.id; // ดึงข้อมูล user_id ของผู้ใช้จาก token
        const myQueue = await queueModel.getQueueByUserId(userId); // ดึงข้อมูลจากตาราง tickets
        if (!myQueue || myQueue.length === 0) {
            return res.status(404).json({ message: 'ไม่พบคิวของผู้ใช้' });
        }
        res.status(200).json(myQueue);
    } catch (error) {
        console.error('Error fetching user queue:', error.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคิวของคุณ' });
    }
};

// ฟังก์ชันสำหรับสร้าง Queue ใหม่
exports.createQueue = async (req, res) => {
    try {
      const { name, description } = req.body;
      console.log('Received body:', req.body); // ตรวจสอบข้อมูลที่ได้รับ
      console.log('User from req:', req.user); // ตรวจสอบข้อมูลผู้ใช้
  
      if (!name || !description) {
        return res.status(400).json({ message: 'กรุณาใส่ชื่อและรายละเอียดของคิว' });
      }
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
      }
  
      const user_id = req.user.id;
      console.log('Creating queue for user_id:', user_id);
  
      const queue_id = await ticketModel.createQueue(user_id, name, description);
  
      res.status(201).json({ message: 'สร้าง Queue สำเร็จ', queue_id });
    } catch (error) {
      console.error('Error in createQueue:', error.message);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง Queue' });
    }
  };
