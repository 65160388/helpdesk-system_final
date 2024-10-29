const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController'); // ตรวจสอบว่ามีการ import ถูกต้อง

// เส้นทางสำหรับดึงรายงานทั้งหมด
router.get('/reports', reportController.getReports); // ตรวจสอบว่าได้ระบุ callback function (reportController.getReports) ถูกต้อง

// เส้นทางสำหรับสร้างรายงานใหม่
router.post('/', reportController.createReport);

// เส้นทางสำหรับดึงสถิติ
router.get('/stats', reportController.getStats); // เพิ่มเส้นทางนี้เพื่อให้ API `/stats` ทำงานได้

module.exports = router;
