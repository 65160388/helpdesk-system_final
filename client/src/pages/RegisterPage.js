import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  // ฟังก์ชันในการจัดการการเปลี่ยนแปลงของ input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันสำหรับการส่งข้อมูลการสมัครสมาชิก
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบเบอร์โทรศัพท์และรหัสผ่าน
    if (!/^\d+$/.test(formData.phone)) {
      setErrorMessage('เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น');
      return;
    } else if (formData.password.length < 8) {
      setErrorMessage('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      // กำหนด role เป็น user โดยอัตโนมัติ
      const registrationData = {
        ...formData,
        role: 'user'  // กำหนด role เป็น 'user' โดยอัตโนมัติ
      };

      // ส่งข้อมูลการสมัครไปยัง API
      const response = await axios.post('http://localhost:5001/api/auth/register', registrationData);
      
      // ตรวจสอบสถานะการลงทะเบียน สำเร็จเป็น 201
      if (response.status === 201) {
        alert('สมัครสมาชิกสำเร็จ');
        // นำทางไปหน้า HomePage หลังจากสมัครสำเร็จ
        window.location.href = '/'; 
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message); 
      setErrorMessage(error.response && error.response.data.error ? error.response.data.error : 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <div className="register-container">
      <h2>สมัครสมาชิก</h2>

      {/* แสดงข้อความผิดพลาด */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">ชื่อจริง:</label>
        <input 
          type="text" 
          id="firstName" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="lastName">นามสกุล:</label>
        <input 
          type="text" 
          id="lastName" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="email">อีเมล:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="phone">เบอร์โทรศัพท์:</label>
        <input 
          type="text" 
          id="phone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="password">รหัสผ่าน:</label>
        <div className="password-container">
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">สมัครสมาชิก</button>
      </form>
      <p>มีบัญชีอยู่แล้ว? <a href="/login">เข้าสู่ระบบที่นี่</a></p>
    </div>
  );
}

export default RegisterPage;
