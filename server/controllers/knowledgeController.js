const knowledgeModel = require('../models/knowledgeModel');

exports.createKnowledge = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await knowledgeModel.createKnowledge({ title, content });
    res.status(201).json({ message: 'เพิ่มบทความความรู้สำเร็จ' });
  } catch (error) {
    next(error);
  }
};

exports.getAllKnowledge = async (req, res, next) => {
  try {
    const articles = await knowledgeModel.getAllKnowledge();
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

exports.getKnowledgeById = async (req, res, next) => {
  try {
    const article = await knowledgeModel.getKnowledgeById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'ไม่พบบทความความรู้ที่ต้องการ' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

exports.updateKnowledge = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    console.log(`User Role: ${req.user.role}`); // ตรวจสอบบทบาทผู้ใช้
    await knowledgeModel.updateKnowledge(req.params.id, { title, content });
    res.json({ message: 'แก้ไขบทความความรู้สำเร็จ' });
  } catch (error) {
    console.log(error); // ตรวจสอบข้อผิดพลาด
    next(error);
  }
};

exports.deleteKnowledge = async (req, res, next) => {
  try {
    await knowledgeModel.deleteKnowledge(req.params.id);
    res.json({ message: 'ลบบทความความรู้สำเร็จ' });
  } catch (error) {
    next(error);
  }
};
