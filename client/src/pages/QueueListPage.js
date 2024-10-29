import React, { useEffect, useState } from 'react';
import ticketService from '../services/ticketService';

const QueueListPage = () => {
  const [queueList, setQueueList] = useState([]);
  const [filteredQueueList, setFilteredQueueList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // สำหรับกรองตามสถานะ

  useEffect(() => {
    const fetchQueueList = async () => {
      try {
        const data = await ticketService.getQueue();
        setQueueList(data);
        setFilteredQueueList(data);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลคิว');
      }
    };
    fetchQueueList();
  }, []);

  // ฟังก์ชันกรองตามสถานะ
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    if (e.target.value === '') {
      setFilteredQueueList(queueList);
    } else {
      const filteredList = queueList.filter((ticket) => ticket.status === e.target.value);
      setFilteredQueueList(filteredList);
    }
  };

  // ฟังก์ชันค้นหาตามหัวข้อ
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredList = queueList.filter((ticket) =>
      ticket.subject.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredQueueList(filteredList);
  };

  return (
    <div className="queue-list-page">
      <h2>รายการคิว Ticket</h2>
      
      {/* ส่วนกรองสถานะ */}
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
        </select>
      </div>
      
      {/* ส่วนค้นหาหัวข้อ */}
      <div className="search-container">
        <label>ค้นหาหัวข้อ:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="ค้นหาตามหัวข้อ..."
        />
      </div>

      {/* แสดงรายการคิว */}
      <ul>
        {filteredQueueList.map((ticket) => (
          <li key={ticket.id}>
            {ticket.subject} - สถานะ: {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueListPage;
