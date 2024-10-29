// middleware/errorHandler.js # จัดการข้อผิดพลาด
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  };
  