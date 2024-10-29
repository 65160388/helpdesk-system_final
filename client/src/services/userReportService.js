// src/services/userReportService.js
import axios from 'axios';

const userReportService = {
    // ส่งรายงานจากผู้ใช้
    sendReport: async (subject, message) => {
        const token = localStorage.getItem('token'); // รับ token จาก localStorage
        console.log('Token:', token);
        
        // ตรวจสอบว่ามี token หรือไม่
        if (!token) {
            alert('กรุณาเข้าสู่ระบบก่อนส่งรายงาน');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // เพิ่ม Authorization Header
            },
        };

        // ส่งคำขอ HTTP POST ไปที่ Backend เพื่อบันทึกรายงาน
        return axios.post(
            'http://localhost:5001/api/userReport/send',
            { subject, message },
            config
        );
    },

    // ดึงข้อมูลรายงานทั้งหมด (สำหรับ Admin และ Staff)
    getAllReports: async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios.get('http://localhost:5001/api/userReport', config);
    },

    // ลบรายงาน (เฉพาะ Admin และ Staff)
    deleteReport: async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios.delete(`http://localhost:5001/api/userReport/${id}`, config);
    },

    // ตอบกลับรายงานผ่านอีเมล (เฉพาะ Admin และ Staff)
    replyReport: async (id, replyMessage) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios.post(
            `http://localhost:5001/api/userReport/reply/${id}`,
            { replyMessage },
            config
        );
    },
};

export default userReportService;
