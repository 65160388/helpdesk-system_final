import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ticketService from '../services/ticketService';
import '../styles/TicketDetailPage.css';

const TicketDetailPage = () => {
  const { ticketId } = useParams(); // รับ ticketId จาก URL
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const data = await ticketService.getTicketById(ticketId); // เรียก API เพื่อดึงรายละเอียดของ Ticket
        setTicket(data);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล Ticket');
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  // ฟังก์ชันกำหนดสีของสถานะตามประเภทของมัน
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return '#00bcd4'; // สีฟ้าสำหรับ New (สดใหม่)
      case 'Assigned':
        return '#ffc107'; // สีเหลืองสำหรับ Assigned (กำลังจะเริ่ม)
      case 'In Progress':
        return '#2196f3'; // สีน้ำเงินสำหรับ In Progress (กำลังดำเนินการ)
      case 'Pending':
        return '#ff9800'; // สีส้มสำหรับ Pending (รอดำเนินการ)
      case 'Resolved':
        return '#4caf50'; // สีเขียวสำหรับ Resolved (แก้ไขแล้ว)
      case 'Closed':
        return '#9e9e9e'; // สีเทาสำหรับ Closed (ปิดแล้ว)
      case 'Reopened':
        return '#f44336'; // สีแดงสำหรับ Reopened (เปิดใหม่เพราะยังแก้ไม่สมบูรณ์)
      case 'Escalated':
        return '#9c27b0'; // สีม่วงสำหรับ Escalated (ต้องการการดูแลจากระดับสูงกว่า)
      case 'Rejected':
        return '#ff5722'; //สีแดงส้ม Rejected (แสดงถึงตั๋วที่ถูกปฏิเสธ เช่น คำขอหรือปัญหาที่ไม่ตรงเงื่อนไข)
      default:
        return '#607d8b'; // สีเทาเข้มสำหรับสถานะอื่นๆ
    }
  };
  

  if (!ticket) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div className="ticket-detail-page">
      <h2>รายละเอียด Ticket</h2>
      <p><strong>หัวข้อ:</strong> {ticket.subject}</p>
      <p><strong>รายละเอียด:</strong> {ticket.description}</p>
      <p>
        <strong>สถานะ:</strong>
        <span
          className="ticket-status"
          style={{ backgroundColor: getStatusColor(ticket.status) }}
        >
          {ticket.status}
        </span>
      </p>
      <p><strong>Queue ID:</strong> {ticket.queue_id}</p>
      <p><strong>วันที่สร้าง:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
    </div>
  );
};

export default TicketDetailPage;
