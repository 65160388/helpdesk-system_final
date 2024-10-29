import React, { useEffect, useState } from 'react';
import ticketService from '../services/ticketService';
import { Link } from 'react-router-dom';
import '../styles/MyTicketsPage.css';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getUserTickets();  // ดึงข้อมูลตั๋วของผู้ใช้เอง
        setTickets(data);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล Tickets ของคุณ');
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="my-tickets-page">
      <h2>ตั๋วของฉัน</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <Link to={`/tickets/${ticket.id}`} className="ticket-link">{ticket.subject}</Link>
            <span className="ticket-status">สถานะ: {ticket.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTicketsPage;
