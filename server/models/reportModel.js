const db = require('../config/db');

exports.getTicketsToday = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM tickets WHERE DATE(created_at) = CURDATE()');
    return rows[0].total;
};

exports.getTotalTickets = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM tickets');
    return rows[0].total;
};

exports.getResolvedTickets = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM tickets WHERE status = "Resolved"');
    return rows[0].total;
};

exports.getPendingTickets = async () => {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM tickets WHERE status = "Pending"');
    return rows[0].total;
};


exports.getAllReports = async () => {
    const [rows] = await db.query('SELECT * FROM reports');
    return rows;
};

exports.createReport = async (name, status) => {
    const [result] = await db.query('INSERT INTO reports (name, status, created_at) VALUES (?, ?, NOW())', [name, status]);
    return result;
};
