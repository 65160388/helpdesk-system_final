import React, { useEffect, useState } from 'react';
import ticketService from '../services/ticketService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/TicketsPage.css';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getAllTickets();
        console.log('Tickets:', data); // ตรวจสอบข้อมูล Tickets
        setTickets(data);
        setSortedTickets(data);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล Tickets');
      }
    };
    fetchTickets();
  }, []);

  const getPriority = (subject) => {
    switch (subject) {
      case 'Network Issue':
        return 4;
      case 'Hardware Issue':
        return 3;
      case 'Software Issue':
        return 2;
      case 'Other':
      default:
        return 1;
    }
  };

  const sortTicketsByHighPriority = () => {
    const sorted = [...tickets].sort((a, b) => getPriority(b.subject) - getPriority(a.subject));
    setSortedTickets(sorted);
  };

  const sortTicketsByLowPriority = () => {
    const sorted = [...tickets].sort((a, b) => getPriority(a.subject) - getPriority(b.subject));
    setSortedTickets(sorted);
  };

  const resetOrder = () => {
    setSortedTickets(tickets);
  };

  const toggleSortOrder = () => {
    if (sortOrder === 'default') {
      sortTicketsByHighPriority();
      setSortOrder('highToLow');
    } else if (sortOrder === 'highToLow') {
      sortTicketsByLowPriority();
      setSortOrder('lowToHigh');
    } else {
      resetOrder();
      setSortOrder('default');
    }
  };

  const handleEditClick = (ticketId) => {
    navigate(`/tickets/edit/${ticketId}`);
  };

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

  return (
    <div className="tickets-page">
      <h2>รายการ Tickets ทั้งหมด</h2>
      <div className="button-container">
        <button className="sort-button-tickets" onClick={toggleSortOrder}>
          {sortOrder === 'default'
            ? 'เรียงตามลำดับเดิม'
            : sortOrder === 'highToLow'
            ? 'เรียงตามความสำคัญ (สูงสุด)'
            : 'เรียงตามความสำคัญ (ต่ำสุด)'}
        </button>
      </div>
      <ul className="ticket-list">
        {sortedTickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <Link to={`/tickets/${ticket.id}`} className="ticket-link">
              {ticket.subject} - 
              <span
                className="ticket-status"
                style={{ backgroundColor: getStatusColor(ticket.status) }}
              >
                สถานะ: {ticket.status}
              </span>
            </Link>
            <button
              className="edit-button"
              onClick={() => handleEditClick(ticket.id)}
            >
              ดูรายละเอียด
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
