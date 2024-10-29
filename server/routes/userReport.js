const express = require('express');
const router = express.Router();
const userReportController = require('../controllers/userReportController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// ส่งรายงาน
router.post('/send', verifyToken, userReportController.sendReport);

// ดูรายงานทั้งหมด (เฉพาะ admin และ staff)
router.get('/', verifyToken, authorizeRoles('admin'), userReportController.getAllReports);

// ลบรายงาน (เฉพาะ admin และ staff)
router.delete('/:id', verifyToken, authorizeRoles('admin'), userReportController.deleteReport);

// ตอบกลับรายงาน (เฉพาะ admin และ staff)
router.post('/reply/:id', verifyToken, authorizeRoles('admin'), userReportController.replyReport);

module.exports = router;

