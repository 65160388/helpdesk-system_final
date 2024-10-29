const bcrypt = require('bcryptjs');
const staffModel = require('../models/staffModel');

exports.addStaff = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await staffModel.addStaff({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'เพิ่มพนักงานสำเร็จ' });
  } catch (error) {
    next(error);
  }
};

exports.getAllStaff = async (req, res, next) => {
  try {
    const staffList = await staffModel.getAllStaff();
    res.json(staffList);
  } catch (error) {
    next(error);
  }
};

// ฟังก์ชันใหม่สำหรับมอบหมาย queue
exports.assignQueueToStaff = async (req, res, next) => {
  try {
    const { staffId, queueId } = req.body;
    console.log(`Assigning Staff ID: ${staffId} to Queue ID: ${queueId}`);

    if (!staffId || !queueId) {
      return res.status(400).json({ message: 'กรุณาระบุพนักงานและคิวที่ต้องการมอบหมาย' });
    }

    const result = await staffModel.assignQueueToStaff(staffId, queueId);
    console.log('Result from Model:', result);
    res.json({ message: 'มอบหมายพนักงานให้กับคิวสำเร็จ' });
  } catch (error) {
    console.error('Error in assignQueueToStaff:', error);
    next(error);
  }
};

// ฟังก์ชันใหม่สำหรับมอบหมาย ticket
exports.assignTicketToStaff = async (req, res, next) => {
  try {
    const { staffId, ticketId, queueId } = req.body;

    // ตรวจสอบว่า staffId และ ticketId ถูกต้องหรือไม่
    if (!staffId || !ticketId || !queueId) {
      return res.status(400).json({ message: 'กรุณาระบุพนักงาน, ตั๋ว และคิวที่ต้องการมอบหมาย' });
    }

    // มอบหมาย ticket ให้กับพนักงาน
    await staffModel.assignTicketToStaff(staffId, ticketId);

    // มอบหมาย queue ให้กับพนักงาน (อัปเดตหรือเพิ่มลงในตาราง staff_queues)
    await staffModel.assignQueueToStaff(staffId, queueId);

    res.json({ message: 'มอบหมายพนักงานให้กับตั๋วและคิวสำเร็จ' });
  } catch (error) {
    next(error);
  }
};

