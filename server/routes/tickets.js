const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validate } = require('../validators/ticketValidator');


// การสร้างตั๋วใหม่ (ให้ผู้ใช้ทุกคนที่เข้าสู่ระบบสามารถสร้างได้)
router.post(
  '/create',
  verifyToken,
  authorizeRoles('admin', 'staff', 'user'),
  [
    check('subject').notEmpty().withMessage('กรุณาใส่หัวเรื่อง'),
    check('description').notEmpty().withMessage('กรุณาใส่รายละเอียด'),
  ],
  validate,
  ticketController.createTicket
);


// การแก้ไขตั๋ว (ให้ admin และ staff สามารถแก้ไขได้)
// router.put(
//   '/edit/:id',
//   verifyToken,
//   authorizeRoles('admin', 'staff'),  // ให้ admin และ staff สามารถแก้ไขได้
//   [
//     check('subject').notEmpty().withMessage('กรุณาใส่หัวเรื่อง'),
//     check('description').notEmpty().withMessage('กรุณาใส่รายละเอียด'),
//   ],
//   validate,
//   ticketController.updateTicket
// );

// การลบตั๋ว (ให้เฉพาะ admin สามารถลบได้)
router.delete(
  '/delete/:id',
  verifyToken,
  authorizeRoles('admin'),  // เฉพาะ admin เท่านั้นที่สามารถลบได้
  ticketController.deleteTicket
);

// ดึงข้อมูลตั๋วของผู้ใช้ (ให้ผู้ใช้ที่เข้าสู่ระบบสามารถดึงได้)
router.get(
  '/my-tickets',
  verifyToken,
  ticketController.getUserTickets
);

// ดึงข้อมูลตั๋วทั้งหมด (ให้ admin และ staff สามารถดึงได้)
router.get(
  '/all',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  ticketController.getAllTickets
);

// ดึงข้อมูลตั๋วตาม ID (ให้ผู้ใช้ที่มีสิทธิ์สามารถดึงได้)
router.get(
  '/:id',
  verifyToken,
  ticketController.getTicketById
);

// การแก้ไขตั๋ว (ให้ admin และ staff สามารถแก้ไขได้)
router.put(
  '/edit/:id',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  [
    check('subject').notEmpty().withMessage('กรุณาใส่หัวเรื่อง'),
    check('description').notEmpty().withMessage('กรุณาใส่รายละเอียด'),
    check('status').notEmpty().withMessage('กรุณาใส่สถานะ'),
  ],
  validate,
  ticketController.updateTicket
);

module.exports = router;
