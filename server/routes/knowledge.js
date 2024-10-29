// routes/knowledge.js
const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const { validate } = require('../validators/knowledgeValidator');

// เพิ่มบทความความรู้
router.post(
  '/',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  [
    check('title').notEmpty().withMessage('กรุณาใส่หัวข้อ'),
    check('content').notEmpty().withMessage('กรุณาใส่เนื้อหา'),
  ],
  validate,
  knowledgeController.createKnowledge
);

// ดึงบทความความรู้ทั้งหมด
router.get('/', knowledgeController.getAllKnowledge);

// ดึงบทความความรู้ตาม ID
router.get('/:id', knowledgeController.getKnowledgeById);

// แก้ไขบทความความรู้
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin', 'staff'),
  [
    check('title').notEmpty().withMessage('กรุณาใส่หัวข้อ'),
    check('content').notEmpty().withMessage('กรุณาใส่เนื้อหา'),
  ],
  validate,
  knowledgeController.updateKnowledge
);

// ลบบทความความรู้
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  knowledgeController.deleteKnowledge
);

module.exports = router;
