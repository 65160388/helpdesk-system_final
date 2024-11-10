import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../styles/IndexPage.css';

const IndexPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        const fullName = `${decodedToken.first_name || 'ไม่ระบุ'} ${decodedToken.last_name || 'ไม่ระบุ'}`;
        setUserName(fullName.trim());
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('ผู้ใช้');
      }
    }
  }, []);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/api/auth/logout', {}, {
        withCredentials: true // เปิดใช้งานการส่งคุกกี้
      });
      localStorage.removeItem('token'); // ลบ token จาก localStorage
      window.location.href = '/'; // เปลี่ยนเส้นทาง
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="index-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>เมนู</h2>
        <ul>
          <li><Link to="/Index">หน้าหลัก</Link></li>
          <li><Link to="/tickets/add">สร้าง Ticket ใหม่</Link></li>
          <li><Link to="/my-tickets">รายการ Ticket ทั้งหมด</Link></li>
          <li><Link to="/knowledge">ฐานข้อมูลความรู้</Link></li>
          <li><Link to="/userReport">รายงานแอดมิน</Link></li>
          <li><Link to="/my-queue">รายการคิว</Link></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>ออกจากระบบ</button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>ยินดีต้อนรับ, {userName}</h1>
          <p>ระบบช่วยเหลือผู้ใช้งาน</p>
        </header>

        <div className="dashboard-sections">
          <div className="section">
            <h2>งานที่ต้องทำ</h2>
            <p>แสดงงานหรือ ticket ที่อยู่ในสถานะรอดำเนินการ</p>
            <Link to="/my-tickets">ดู Ticket ของฉัน</Link>
          </div>

          <div className="section">
            <h2>รายงานแอดมิน</h2>
            <p>สามารถส่งอีเมลหาแอดมินพื่อแก้ไขระบบ หรือข้อผิดพลาดของระบบ</p>
            <Link to="/userReport">ติดต่อ</Link>
          </div>

          <div className="section">
            <h2>ฐานข้อมูลความรู้</h2>
            <p>เข้าถึงและจัดการข้อมูลความรู้ต่างๆ</p>
            <Link to="/knowledge">ดูฐานข้อมูล</Link>
          </div>

          <div className="section">
            <h2>ดูคิวของฉัน</h2>
            <p>ดูคิวของ Ticket ที่ส่งไปทั้งหมด</p>
            <Link to="/my-queue">ดูรายการคิว</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
