// models/knowledgeModel.js
const pool = require('../config/db'); // ตรวจสอบให้แน่ใจว่าได้ตั้งค่าเชื่อมต่อ DB ใน config/db.js แล้ว

exports.createKnowledge = async ({ title, content }) => {
  const [result] = await pool.execute(
    'INSERT INTO knowledge_base (title, content) VALUES (?, ?)',
    [title, content]
  );
  return result;
};

exports.getAllKnowledge = async () => {
  const [rows] = await pool.execute('SELECT * FROM knowledge_base');
  return rows;
};

exports.getKnowledgeById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM knowledge_base WHERE id = ?', [id]);
  return rows[0];
};

exports.updateKnowledge = async (id, { title, content }) => {
  const [result] = await pool.execute(
    'UPDATE knowledge_base SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
  );
  return result;
};

exports.deleteKnowledge = async (id) => {
  const [result] = await pool.execute('DELETE FROM knowledge_base WHERE id = ?', [id]);
  return result;
};
