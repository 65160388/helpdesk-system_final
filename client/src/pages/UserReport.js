import React, { useState } from 'react';
import userReportService from '../services/userReportService';
import '../styles/UserReport.css';

const UserReport = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const response = await userReportService.sendReport(subject, message);
            if (response.status === 200 || response.status === 201) {
                alert('ส่งรายงานสำเร็จ');
                setSubject('');
                setMessage('');
            } else {
                alert('เกิดข้อผิดพลาดในการส่งรายงาน');
            }
        } catch (error) {
            if (error.response) {
                alert(`เกิดข้อผิดพลาด: ${error.response.data.error}`);
            } else {
                alert('ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="user-report-form" onSubmit={handleSubmit}>
            <h2>ส่งรายงาน</h2>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="หัวข้อรายงาน"
                    required
                    disabled={loading}
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ข้อความแจ้งปัญหา"
                    required
                    disabled={loading}
                ></textarea>
                <button type="submit" disabled={loading}>
                    {loading ? 'กำลังส่ง...' : 'ส่งรายงาน'}
                </button>
            </form>
        </div>
    );
};

export default UserReport;
