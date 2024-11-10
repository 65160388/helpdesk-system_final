const db = require('../config/db');

const userReportModel = {
    createReport: async (userId, email, subject, message) => {
        const sql = 'INSERT INTO userReports (user_id, email, subject, message) VALUES (?, ?, ?, ?)';
        const params = [userId, email, subject, message];
        return db.query(sql, params);
    },
    getAllReports: async () => {
        const sql = 'SELECT * FROM userReports';
        return db.query(sql);
    },
    deleteReportById: async (id) => {
        const sql = 'DELETE FROM userReports WHERE id = ?';
        return db.query(sql, [id]);
    },
    getReportById: async (id) => {
        const sql = 'SELECT * FROM userReports WHERE id = ?';
        return db.query(sql, [id]);
    }
};

module.exports = userReportModel;
