const ticketModel = require('../models/ticketModel');

// ฟังก์ชันสำหรับสร้างตั๋วใหม่
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, queue_id } = req.body;
    console.log('Request body:', req.body);

    // ตรวจสอบข้อมูลผู้ใช้
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
    }

    const user_id = req.user.id;

    // ตรวจสอบว่า queue_id มีอยู่ในฐานข้อมูลหรือไม่
    const isQueueExists = await ticketModel.isQueueExists(queue_id);
    if (!isQueueExists) {
      return res.status(400).json({ message: 'ไม่พบ Queue ที่ระบุ' });
    }

    // สร้างตั๋วใหม่
    const result = await ticketModel.createTicket({
      user_id,
      queue_id,
      subject,
      description,
      status: 'New',
    });
    res.status(201).json({ message: 'สร้าง Ticket สำเร็จ', ticketId: result.insertId });
  } catch (error) {
    console.error('Error in createTicket:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างตั๋ว' });
  }
};

// ฟังก์ชันสำหรับแก้ไขตั๋ว
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, description, status, staff_id } = req.body;

    // ตรวจสอบสิทธิ์
    if (!['admin', 'staff'].includes(req.user.role)) {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์แก้ไขตั๋วนี้' });
    }

    // อัปเดตข้อมูลตั๋ว
    const result = await ticketModel.updateTicket(id, { subject, description, status });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบตั๋วที่ต้องการแก้ไข' });
    }

    // ถ้ามีการส่ง staff_id มาด้วย ให้ทำการอัปเดตข้อมูลในตาราง staff_tickets
    if (staff_id) {
      await ticketModel.assignStaffToTicket(staff_id, id);
    }

    res.json({ message: 'แก้ไข Ticket สำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขตั๋ว', error: error.message });
  }
};

// ฟังก์ชันสำหรับลบตั๋ว
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketModel.getTicketById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'ไม่พบตั๋วที่ต้องการลบ' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์ลบตั๋วนี้' });
    }

    await ticketModel.deleteTicket(id);

    res.json({ message: 'ลบ Ticket สำเร็จ' });
  } catch (error) {
    console.error('Error in deleteTicket:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบตั๋ว' });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลตั๋วของผู้ใช้
exports.getUserTickets = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(401).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
    }

    const tickets = await ticketModel.getTicketsByUserId(user_id);

    res.json(tickets);
  } catch (error) {
    console.error('Error in getUserTickets:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลตั๋ว' });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลตั๋วทั้งหมด (สำหรับ admin และ staff)
exports.getAllTickets = async (req, res) => {
  try {
    // ไม่ต้องตรวจสอบ role เพราะ middleware authorizeRoles หรือใน authMiddleware.js ทำหน้าที่นี้แล้ว
    const tickets = await ticketModel.getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error('Error in getAllTickets:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลตั๋ว' });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลตั๋วตาม ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketModel.getTicketById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'ไม่พบตั๋วที่ต้องการ' });
    }

    if (ticket.user_id !== req.user.id && !['admin', 'staff'].includes(req.user.role)) {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์เข้าถึงตั๋วนี้' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error in getTicketById:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลตั๋ว' });
  }
};

