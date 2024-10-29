const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// API สำหรับการสร้างบัญชี
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const role = 'user'; // ตั้ง role เป็น user โดยอัตโนมัติ

  try {
    console.log('Registering user:', { firstName, lastName, email, password, role });

    const existingUser = await userModel.findUserByEmail(email);

    // ตรวจสอบว่า existingUser ไม่ใช่ null และเป็นอาร์เรย์
    if (existingUser && existingUser.length > 0) {
      console.log('Email already exists:', email);
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้แล้ว' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(firstName, lastName, email, hashedPassword, role);
    res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', role });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดระหว่างการลงทะเบียน:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดระหว่างการลงทะเบียน' });
  }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    
    // ตรวจสอบว่าพบผู้ใช้หรือไม่ และมีข้อมูล password หรือไม่
    if (!user || !user.password) {
      return res.status(400).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    //สร้าง token
    const token = jwt.sign(
      { id: user.id, role: user.role, first_name: user.first_name, last_name: user.last_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    // ตั้งค่าการส่ง JWT กลับไปใน cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ใช้ secure flag เมื่ออยู่ใน production
      sameSite: 'lax', // หรือ strict ขึ้นอยู่กับว่าแอพทำงานอย่างไร
    });

    console.log('Generated token:', token);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ' });
  }
};

// ฟังก์ชันสำหรับการออกจากระบบ
exports.logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(200).json({ message: 'ออกจากระบบสำเร็จ' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดระหว่างการออกจากระบบ:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดระหว่างการออกจากระบบ' });
  }
};
