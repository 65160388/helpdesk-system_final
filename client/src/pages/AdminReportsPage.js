import React, { useEffect, useState } from 'react';
import reportService from '../services/reportService';
import '../styles/AdminReportsPage.css';

const AdminReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    ticketsToday: 0,
    totalTickets: 0,
    resolvedTickets: 0,
    pendingTickets: 0,
  });
  const [userReports, setUserReports] = useState([]); // เพิ่มสถานะสำหรับเก็บรายงานของผู้ใช้

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงสถิติ
        const statsData = await reportService.getStats(); 
        setStats(statsData);

        // ดึงรายงานของผู้ใช้
        const reportsData = await reportService.getReports(); // หรือ getUserReports() ถ้าคุณแยกฟังก์ชัน
        setUserReports(reportsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const adminEmail = "testcode.n1@gmail.com"; // กำหนดอีเมลของแอดมิน

  // ฟังก์ชันสำหรับการเปิดหน้าเขียนอีเมลใน Gmail
  const handleEmailClick = (report) => {
    const subject = encodeURIComponent(`ตอบกลับข้อความ: ${report.subject}`);
    const body = encodeURIComponent(`ข้อความจากผู้ใช้: ${report.message}`);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${subject}&body=${body}`;

    console.log('Gmail Link:', gmailLink);
    window.open(gmailLink, '_blank'); // เปิด Gmail ในแท็บใหม่
  };

  return (
    <div className="report-page">
      <h1>สรุปรายงานและสถิติ</h1>
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <>
          {/* ส่วนแสดงข้อมูลสถิติ */}
          <div className="stats-container">
            <div className="stat-card">
              <h3>Ticket ที่สร้างวันนี้</h3>
              <p>{stats.ticketsToday}</p>
            </div>
            <div className="stat-card">
              <h3>Ticket ทั้งหมด</h3>
              <p>{stats.totalTickets}</p>
            </div>
            <div className="stat-card">
              <h3>Ticket ที่แก้ไขแล้ว</h3>
              <p>{stats.resolvedTickets}</p>
            </div>
            <div className="stat-card">
              <h3>Ticket ที่รอดำเนินการ</h3>
              <p>{stats.pendingTickets}</p>
            </div>
          </div>

          {/* ส่วนแสดงข้อความที่ผู้ใช้ส่งมา */}
          <h2>ข้อความที่ผู้ใช้ส่งมา</h2>
          {userReports.length > 0 ? (
            <div className="user-reports">
              {userReports.map((report) => (
                <div key={report.id} className="report-card">
                  <h3>{report.subject}</h3>
                  <p><strong>จาก:</strong> {report.email}</p>
                  <p><strong>ข้อความ:</strong> {report.message}</p>
                  <p><strong>วันที่ส่ง:</strong> {new Date(report.created_at).toLocaleString()}</p>
                  <button 
                    onClick={() => handleEmailClick(report)} 
                    className="reply-button">
                    ตอบกลับ
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>ไม่มีข้อความจากผู้ใช้</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminReportsPage;
