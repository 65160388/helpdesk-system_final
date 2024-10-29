import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../styles/StaffIndexPage.css'; 

const StaffIndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        if (userRole !== 'admin' && userRole !== 'staff') {
          navigate('/'); // หรือแสดงข้อความว่าไม่มีสิทธิ์เข้าถึง
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

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
    <div className="staff-index-page">
      <header className="header">
        <h1>ระบบจัดการ Help Desk</h1>
        <p>ยินดีต้อนรับสู่หน้าจัดการสำหรับพนักงาน</p>
      </header>
      
      <div className="content">
        <nav>
          <ul className="menu">
            <li>
              <button className="menu-button" onClick={() => navigate('/staff/dashboard')}>
                <i className="fas fa-chart-line"></i> Dashboard
              </button>
            </li>
            <li>
              <button className="menu-button" onClick={() => navigate('/tickets')}>
                <i className="fas fa-ticket-alt"></i> จัดการ Tickets
              </button>
            </li>
            <li>
              <button className="menu-button" onClick={() => navigate('/tickets/add')}>
                <i className="fas fa-plus-circle"></i> สร้าง Ticket ใหม่
              </button>
            </li>
            <li>
              <button className="menu-button" onClick={() => navigate('/knowledge')}>
                <i className="fas fa-book"></i> จัดการฐานความรู้ (Knowledge Base)
              </button>
            </li>
            {/* เฉพาะ admin เท่านั้นที่เห็นเมนูนี้ */}
            {(() => {
              const token = localStorage.getItem('token');
              const decodedToken = jwtDecode(token);
              if (decodedToken.role === 'admin') {
                return (
                  <>
                    <li>
                      <button className="menu-button" onClick={() => navigate('/staff/add')}>
                        <i className="fas fa-user-plus"></i> เพิ่มพนักงาน
                      </button>
                    </li>
                    <li>
                      <button className="menu-button" onClick={() => navigate('/reports')}>
                        <i className="fas fa-file-alt"></i> รายงานและสถิติ
                      </button>
                    </li>
                    <li>
                      <button className="menu-button" onClick={() => navigate('/knowledge/add')}>
                        <i className="fas fa-plus-circle"></i> เพิ่ม Knowledge Base
                      </button>
                    </li>
                    <li>
                      <button className="menu-button" onClick={() => navigate('/tickets/edit')}>
                        <i className="fas fa-edit"></i> แก้ไข Ticket
                      </button>
                    </li>
                    <li>
                      <button className="menu-button" onClick={() => navigate('/queue/list')}>
                        <i className="fas fa-list"></i> ดู Queue
                      </button>
                    </li>
                  </>
                );
              }
              return null;
            })()}
            <li>
              <button className="menu-button logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> ออกจากระบบ
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default StaffIndexPage;
