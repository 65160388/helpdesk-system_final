const jwt = require('jsonwebtoken');

// เรียกใช้ JWT_SECRET จาก .env ถ้าไม่มีใช้ค่าเริ่มต้น 'your_jwt_secret'
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

exports.verifyToken = (req, res, next) => {
  // ตรวจสอบ header ที่ส่งมาทั้งพิมพ์เล็กและพิมพ์ใหญ่
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // แยก token ออกมา
    const token = authHeader.split(' ')[1];
    console.log('Received token:', token);  // ตรวจสอบ token ที่ได้รับ
    
    try {
      // ตรวจสอบความถูกต้องของ token
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log('Token verification failed:', err.message);  // แสดงข้อผิดพลาดถ้ามี
          return res.status(401).json({ message: 'โทเค็นไม่ถูกต้องหรือหมดอายุ' });
        }
        
        // เก็บข้อมูลผู้ใช้ที่ตรวจสอบแล้วไว้ใน req.user
        req.user = decoded;
        next(); // ให้ไปยัง middleware ถัดไป
      });
    } catch (error) {
      console.log('Error in token verification:', error.message);  // ตรวจสอบข้อผิดพลาดจาก jwt.verify()
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบโทเค็น' });
    }

  } else {
    // ถ้าไม่มี token ส่งมา
    return res.status(401).json({ message: 'กรุณาเข้าสู่ระบบและใส่โทเค็น' });
  }
};

// authorizeRoles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // ตรวจสอบบทบาทของผู้ใช้
    if (!roles.includes(req.user.role)) {
      console.log('Unauthorized role access:', req.user.role);  // แสดงบทบาทที่ไม่ตรงกับที่ต้องการ
      return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึง' });
    }
    next(); // ให้ไปยัง middleware หรือ controller ถัดไป
  };
};
