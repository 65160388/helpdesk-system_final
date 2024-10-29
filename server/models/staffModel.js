const pool = require('../config/db');

exports.addStaff = async ({ name, email, password }) => {
  const role = 'staff';
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  return result;
};

exports.getAllStaff = async () => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE role = ?', ['staff']);
  return rows;
};

// เพิ่มฟังก์ชันจัดการ staff_queues
exports.assignQueueToStaff = async (staffId, queueId) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO staff_queues (staff_id, queue_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE queue_id = VALUES(queue_id)',
      [staffId, queueId]
    );
    console.log('Assigned Staff to Queue Result:', result);
    return result;
  } catch (error) {
    console.error('Error assigning staff to queue:', error.message);
    throw new Error('เกิดข้อผิดพลาดในการมอบหมายพนักงานให้กับคิว');
  }
};

// เพิ่มฟังก์ชันจัดการ staff_tickets
exports.assignTicketToStaff = async (staffId, ticketId) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO staff_tickets (staff_id, ticket_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE staff_id = VALUES(staff_id)',
      [staffId, ticketId]
    );
    return result;
  } catch (error) {
    console.error('Error assigning staff to ticket:', error.message);
    throw new Error('เกิดข้อผิดพลาดในการมอบหมายพนักงานให้กับตั๋ว');
  }
};
