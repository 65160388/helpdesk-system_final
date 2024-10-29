const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Route สำหรับดึงข้อมูลคิวทั้งหมด (ให้เฉพาะ admin หรือ staff เข้าถึงได้)
router.get(
  '/list',
  verifyToken,
  authorizeRoles('admin', 'staff'), // ให้สิทธิ์ admin และ staff ในการดูรายการคิวทั้งหมด
  queueController.getQueueList
);

// Route สำหรับดึงข้อมูลคิวของผู้ใช้ที่เข้าสู่ระบบ
router.get(
  '/my-queue',
  verifyToken,
  queueController.getMyQueue // สำหรับผู้ใช้ทั่วไปที่เข้าสู่ระบบสามารถดูข้อมูลคิวของตัวเอง
);

// Route สำหรับสร้าง Queue ใหม่
router.post(
    '/create', 
    verifyToken, 
    authorizeRoles('admin', 'staff', 'user'),
    queueController.createQueue // ฟังก์ชันใน controller ที่จะจัดการการสร้างคิว
);
  

module.exports = router;
