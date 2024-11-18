import React, { useEffect, useState } from 'react';
import ticketService from '../services/ticketService';
import '../styles/QueueListPage.css';

const QueueListPage = () => {
  const [ticketList, setTicketList] = useState([]);
  const [filteredTicketList, setFilteredTicketList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketList = async () => {
      try {
        const data = await ticketService.getAllTickets();
        setTicketList(data);
        setFilteredTicketList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketList();
  }, []);

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    filterTickets(searchTerm, selectedStatus);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterTickets(term, statusFilter);
  };

  const filterTickets = (term, status) => {
    let filteredList = ticketList;
    if (term) {
      filteredList = filteredList.filter((ticket) =>
        ticket.subject?.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (status) {
      filteredList = filteredList.filter((ticket) => ticket.status === status);
    }
    setFilteredTicketList(filteredList);
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div className="ticket-list-page-container">
      <h2>รายการ Queue ทั้งหมด</h2>
      <div className="filter-container">
        <label>กรองตามสถานะ:</label>
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="">แสดงทั้งหมด</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
          <option value="Reopened">Reopened</option>
          <option value="Escalated">Escalated</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="search-container">
        <label>ค้นหาเลขคิว:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="ค้นหาตามเลขคิว..."
        />
      </div>
      <ul className="ticket-list-grid">
        {filteredTicketList.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h3>{ticket.subject}</h3>
            <p><strong>รายละเอียด:</strong> {ticket.description}</p>
            <p className={`status ${ticket.status?.replace(/\s+/g, '-')}`}>
              สถานะ: {ticket.status || 'ไม่มีสถานะ'}
            </p>
            {/* <p><strong>เจ้าของคิว:</strong> {ticket.name || 'ไม่ทราบ'}</p> */}
            <p><strong>เลขคิว:</strong> {ticket.queue_id || 'ไม่มีเลขคิว'}</p>
            <p><strong>วันที่สร้าง:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueListPage;
