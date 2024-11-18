const pool = require('../config/db');

// ฟังก์ชันสำหรับสร้าง Queue ใหม่
exports.createQueue = async (user_id, name, description) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO queues (user_id, name, description) VALUES (?, ?, ?)',
      [user_id, name, description]
    );
    return result.insertId; // ส่งคืน queue_id ที่สร้างใหม่
  } catch (error) {
    console.error('Error creating queue:', error.message);
    throw new Error('Error creating queue: ' + error.message);
  }
};

// ฟังก์ชันตรวจสอบว่า queue_id มีอยู่ในตาราง queues หรือไม่
exports.isQueueExists = async (queue_id) => {
  try {
    const [rows] = await pool.execute('SELECT id FROM queues WHERE id = ?', [queue_id]);
    return rows.length > 0; // คืนค่า true ถ้าพบ queue_id ในตาราง
  } catch (error) {
    console.error('Error checking if queue exists:', error.message);
    throw new Error('Error checking if queue exists: ' + error.message);
  }
};

// ฟังก์ชันสำหรับสร้างตั๋วใหม่ในฐานข้อมูล
exports.createTicket = async (ticketData) => {
  const { user_id, queue_id, subject, description, status } = ticketData;
  try {
    const [result] = await pool.execute(
      'INSERT INTO tickets (user_id, queue_id, subject, description, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, queue_id, subject, description, status || 'New']
    );

    if (result.affectedRows === 0) {
      throw new Error('No rows were inserted.');
    }

    return result;
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    throw new Error('Error creating ticket: ' + error.message);
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้โดยใช้ user_id
exports.getUserById = async (user_id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [user_id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    throw new Error('Error fetching user by ID: ' + error.message);
  }
};

// ฟังก์ชันสำหรับดึงตั๋วโดยใช้ user_id
exports.getTicketsByUserId = async (user_id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE user_id = ?', [user_id]);
    console.log('Tickets for user:', user_id, rows);
    return rows;
  } catch (error) {
    console.error('Error fetching tickets by user ID:', error.message);
    throw new Error('Error fetching tickets by user ID: ' + error.message);
  }
};

// ฟังก์ชันสำหรับดึงตั๋วโดยใช้ ID
exports.getTicketById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE id = ?', [id]);
    console.log('Ticket fetched by ID:', id, rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching ticket by ID:', error.message);
    throw new Error('Error fetching ticket by ID: ' + error.message);
  }
};

// ฟังก์ชันสำหรับอัปเดตตั๋วในฐานข้อมูล
exports.updateTicket = async (id, ticketData) => {
  const { subject, description, status } = ticketData;

  try {
    const [result] = await pool.execute(
      `UPDATE tickets 
       SET 
         subject = IFNULL(?, subject), 
         description = IFNULL(?, description), 
         status = IFNULL(?, status) 
       WHERE id = ?`,
      [subject, description, status, id]
    );

    console.log('Ticket update result:', result);
    if (result.affectedRows === 0) {
      throw new Error('No rows were updated.');
    }

    return result;
  } catch (error) {
    console.error('Error updating ticket:', error.message);
    throw new Error('Error updating ticket: ' + error.message);
  }
};

// ฟังก์ชันสำหรับดึงตั๋วทั้งหมด
exports.getAllTickets = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets');
    console.log('All tickets:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching all tickets:', error.message);
    throw new Error('Error fetching all tickets: ' + error.message);
  }
};

// ฟังก์ชันสำหรับลบตั๋ว
exports.deleteTicket = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM tickets WHERE id = ?', [id]);
    console.log('Ticket deletion result:', result);
    if (result.affectedRows === 0) {
      throw new Error('No rows were deleted.');
    }
    return result;
  } catch (error) {
    console.error('Error deleting ticket:', error.message);
    throw new Error('Error deleting ticket: ' + error.message);
  }
};

// ฟังก์ชันสำหรับมอบหมาย staff ให้ queue
exports.assignStaffToQueue = async (staff_id, queue_id) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO staff_queues (staff_id, queue_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE staff_id = VALUES(staff_id)',
      [staff_id, queue_id]
    );
    return result;
  } catch (error) {
    console.error('Error assigning staff to queue:', error.message);
    throw new Error('Error assigning staff to queue: ' + error.message);
  }
};

// ฟังก์ชันสำหรับมอบหมาย staff ให้ ticket
exports.assignStaffToTicket = async (staff_id, ticket_id) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO staff_tickets (staff_id, ticket_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE staff_id = VALUES(staff_id)',
      [staff_id, ticket_id]
    );
    return result;
  } catch (error) {
    console.error('Error assigning staff to ticket:', error.message);
    throw new Error('Error assigning staff to ticket: ' + error.message);
  }
};

