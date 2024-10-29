const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// เส้นทางสำหรับการลงทะเบียน
router.post('/register', authController.register);

// เส้นทางสำหรับการเข้าสู่ระบบ
router.post('/login', authController.login);

// เส้นทางสำหรับการออกจากระบบ
router.post('/logout', authController.logout);

module.exports = router;
