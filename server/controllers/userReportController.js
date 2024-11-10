const nodemailer = require('nodemailer');
const userReportModel = require('../models/userReportModel');
const db = require('../config/db');

exports.sendReport = async (req, res) => {
    // ตรวจสอบว่า req.user มีค่าและมี userId หรือไม่
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'คุณต้องเข้าสู่ระบบก่อนส่งรายงาน' });
    }

    const { subject, message } = req.body;
    const userId = req.user.id;

    // ดึงอีเมลของผู้ใช้จากฐานข้อมูล
    let email;
    try {
        const [rows] = await db.query('SELECT email FROM users WHERE id = ?', [userId]);
        console.log('Query result:', rows); // พิมพ์ผลลัพธ์จากการ query

        if (rows.length > 0) {
            email = rows[0].email;
            console.log('Fetched email:', email); // พิมพ์อีเมลที่ได้
        } else {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
        }
    } catch (error) {
        console.error('Error fetching user email:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
    }

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!subject || !message) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try {
        // บันทึกข้อมูลลงฐานข้อมูลโดยใช้โมเดล
        await userReportModel.createReport(userId, email, subject, message);

        // ส่งอีเมลถึงแอดมิน
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL_USER,
                pass: process.env.ADMIN_EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.ADMIN_EMAIL_USER,
            to: process.env.ADMIN_EMAIL_USER,
            replyTo: email,
            subject: `User Report: ${subject}`,
            text: `จาก: ${email}\n\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'ส่งรายงานสำเร็จ' });
    } catch (error) {
        console.error('Error sending report:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการส่งรายงาน' });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const [reports] = await userReportModel.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน' });
    }
};

exports.deleteReport = async (req, res) => {
    const { id } = req.params;
    try {
        await userReportModel.deleteReportById(id);
        res.status(200).json({ message: 'ลบรายงานสำเร็จ' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบรายงาน' });
    }
};

exports.replyReport = async (req, res) => {
    const { id } = req.params;
    const { replyMessage } = req.body;

    try {
        const [reportRows] = await userReportModel.getReportById(id);
        const report = reportRows[0];

        if (!report) {
            return res.status(404).json({ error: 'ไม่พบบันทึกการแจ้งปัญหา' });
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL_USER, // อีเมลของแอดมิน
                pass: process.env.ADMIN_EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.ADMIN_EMAIL_USER,
            to: report.email,
            subject: `Reply to: ${report.subject}`,
            text: replyMessage
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'ตอบกลับอีเมลสำเร็จ' });
    } catch (error) {
        console.error('Error replying to report:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตอบกลับอีเมล' });
    }
};
