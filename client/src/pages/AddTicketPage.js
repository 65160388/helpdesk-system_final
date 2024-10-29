import React, { useState, useEffect } from 'react';
import ticketService from '../services/ticketService';
import jwtDecode from 'jwt-decode'; // ใช้ jwt-decode เพื่อถอดข้อมูลจาก token
import '../styles/AddTicketPage.css';

const AddTicketPage = () => {
  const [formData, setFormData] = useState({ subject: '', description: '' });
  const [issuesList, setIssuesList] = useState([]);
  const [userName, setUserName] = useState(''); // เก็บชื่อผู้ใช้

  const issueOptions = ['Network Issue', 'Hardware Issue', 'Software Issue', 'Other'];

  // ฟังก์ชันสำหรับดึงชื่อผู้ใช้จาก token
  useEffect(() => {
    const token = localStorage.getItem('token'); // สมมติว่า token ถูกเก็บใน localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      const fullName = `${decodedToken.first_name} ${decodedToken.last_name}`;
      setUserName(fullName); // เก็บชื่อผู้ใช้ใน state
    }
  }, []);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // เพิ่มปัญหาใหม่ไปยังรายการปัญหาในคิวเดียวกัน
  const handleAddIssue = (e) => {
    e.preventDefault();
    if (formData.subject && formData.description) {
      setIssuesList([...issuesList, { ...formData }]);
      setFormData({ subject: '', description: '' });
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  // ลบปัญหาจากรายการ
  const handleDeleteIssue = (index) => {
    const updatedIssues = issuesList.filter((_, i) => i !== index);
    setIssuesList(updatedIssues);
  };

  // ส่งปัญหาในฟอร์มได้เลย
  const handleSubmitSingle = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      const queueData = {
        name: `คิวของ ${userName}`,
        description: 'รายละเอียดของคิว',
      };
      const queueResponse = await ticketService.createQueue(queueData);
      const newQueueId = queueResponse.queue_id || queueResponse.queueId;

      await ticketService.createTicket({ ...formData, queue_id: newQueueId });

      alert('สร้าง Ticket สำเร็จ');
      setFormData({ subject: '', description: '' });
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง Ticket');
    }
  };

  // ส่งปัญหาทั้งหมดในคิวเดียวกัน
  const handleSubmitAll = async (e) => {
    e.preventDefault();
    if (issuesList.length === 0) {
      alert('กรุณาเพิ่มปัญหาในคิว');
      return;
    }

    try {
      // สร้างคิวใหม่โดยใช้ชื่อผู้ใช้
      const queueData = {
        name: `คิวของ ${userName}`, // ใช้ชื่อของผู้ใช้ที่ล็อกอินเป็นชื่อคิว
        description: 'รายละเอียดของคิว',
      };
      const queueResponse = await ticketService.createQueue(queueData);
      const newQueueId = queueResponse.queue_id || queueResponse.queueId;

      // ส่งแต่ละปัญหาไปยัง Backend พร้อมกับ queue_id
      for (const issue of issuesList) {
        await ticketService.createTicket({ ...issue, queue_id: newQueueId });
      }

      alert('สร้าง Ticket สำเร็จทั้งหมด');
      setIssuesList([]);
    } catch (error) {
      console.error('Error creating tickets:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง Ticket');
    }
  };

  return (
    <div className="add-ticket-page">
      <h2>สร้าง Ticket ใหม่ (1 คิวหลายปัญหา)</h2>
      <form className="ticket-form">
        <label>
          เลือกประเภทปัญหา:
          <select name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">เลือกหัวข้อปัญหา</option>
            {issueOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          รายละเอียด:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="ใส่รายละเอียดปัญหาที่เกิดขึ้น"
            required
          />
        </label>

        <div className="button-group">
          <button type="button" className="add-issue-button" onClick={handleAddIssue}>
            เพิ่มปัญหา
          </button>
          <button type="button" className="submit-all-button" onClick={handleSubmitAll}>
            ส่ง Ticket ทั้งหมด
          </button>
        </div>
      </form>

      <div className="issue-list">
        <h3>รายการปัญหาภายในคิว:</h3>
        {issuesList.length === 0 ? (
          <p>ยังไม่มีปัญหาในคิว</p>
        ) : (
          <ul>
            {issuesList.map((issue, index) => (
              <li key={index} className="issue-item">
                <strong>{issue.subject}</strong>: {issue.description}
                <button onClick={() => handleDeleteIssue(index)} className="delete-button">
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddTicketPage;
