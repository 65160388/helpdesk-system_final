import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// ดึงรายงานทั้งหมด (เพิ่มฟังก์ชันนี้)
const getUserReports = async () => {
  const token = localStorage.getItem('token'); // รับ token จาก localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // เพิ่ม Authorization Header
    },
  };
  const response = await axios.get(`${API_URL}/userReport`, config); // เรียกไปที่ /api/userReports
  return response.data;
};

// ดึงสถิติสำหรับแดชบอร์ด
const getStats = async () => {
  const token = localStorage.getItem('token'); // รับ token จาก localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // เพิ่ม Authorization Header
    },
  };
  const response = await axios.get(`${API_URL}/reports/stats`, config);  // เรียกไปที่ /api/reports/stats
  return response.data;
};

// ลบรายงาน
const deleteReport = async (id) => {
  const token = localStorage.getItem('token'); // รับ token จาก localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // เพิ่ม Authorization Header
    },
  };
  const response = await axios.delete(`${API_URL}/reports/${id}`, config);
  return response.data;
};

const reportService = {
  getReports: getUserReports, // ใช้ฟังก์ชัน getUserReports สำหรับ getReports
  getStats,
  deleteReport,
};

export default reportService;
