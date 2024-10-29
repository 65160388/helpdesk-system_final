import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ส่ง request เพื่อเข้าสู่ระบบไปที่ backend พร้อมเปิดใช้งานการส่งคุกกี้
      const { data } = await axios.post(
        'http://localhost:5001/api/auth/login', 
        { email, password }, 
        { withCredentials: true }
      );

      // เก็บ token ใน localStorage
      localStorage.setItem('token', data.token);

      // ตรวจสอบ token และดึง role ออกมา
      if (data.token) {
        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.role;

        console.log('Decoded Token:', decodedToken);
        console.log('User Role:', userRole);

        alert('เข้าสู่ระบบสำเร็จ');

        // ตรวจสอบ role ของผู้ใช้และเปลี่ยนหน้า
        if (userRole === 'admin') {
          navigate('/staff');
        } else if (userRole === 'staff') {
          navigate('/staff');
        } else {
          navigate('/Index');
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setErrorMessage('เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง');
    }
  };

  // ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>เข้าสู่ระบบ</h2>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">อีเมล:</label>
        <input
          type="email"
          id="email"
          placeholder="ใส่อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">รหัสผ่าน:</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="ใส่รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="fas fa-eye toggle-password" onClick={togglePasswordVisibility}></i>
        </div>

        <input type="submit" value="เข้าสู่ระบบ" />
      </form>
      <p>
        ยังไม่ได้เป็นสมาชิก? <a href="/register">สมัครสมาชิกที่นี่</a>
      </p>
    </div>
  );
}

export default LoginPage;
