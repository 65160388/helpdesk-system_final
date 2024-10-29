// routes/staff.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validate } = require('../validators/authValidator');

// เพิ่มพนักงานใหม่
router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  [
    check('name').notEmpty().withMessage('กรุณาใส่ชื่อ'),
    check('email').isEmail().withMessage('กรุณาใส่อีเมลที่ถูกต้อง'),
    check('password').isLength({ min: 6 }).withMessage('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  ],
  validate,
  staffController.addStaff
);

// ดึงรายการพนักงานทั้งหมด
router.get('/', verifyToken, authorizeRoles('admin'), staffController.getAllStaff);

// เพิ่มฟังก์ชันสำหรับมอบหมาย Queue ให้กับพนักงาน endpoint
router.post('/assignQueue', verifyToken, authorizeRoles('admin'), staffController.assignQueueToStaff);

module.exports = router;
