import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ticketService from '../services/ticketService';
import staffService from '../services/staffService'; // เพิ่ม import สำหรับ staff
import '../styles/EditTicketPage.css';

const EditTicketPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ subject: '', description: '', status: '', staff_id: '', queue_id: '' });
  const [staffList, setStaffList] = useState([]); // สถานะสำหรับเก็บรายชื่อพนักงาน

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await ticketService.getTicketById(id);
        setFormData({ 
          subject: data.subject, 
          description: data.description, 
          status: data.status, 
          staff_id: data.staff_id || '', // เก็บ staff_id ของ ticket
          queue_id: data.queue_id || '' // เพิ่ม queue_id ของ ticket
        });
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล Ticket');
      }
    };

    const fetchStaffList = async () => {
      try {
        const staffData = await staffService.getAllStaff();
        setStaffList(staffData);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน');
      }
    };

    fetchTicket();
    fetchStaffList(); // ดึงข้อมูลรายชื่อพนักงาน
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditTicket = async (e) => {
    e.preventDefault();
    try {
      // อัปเดต ticket พร้อมข้อมูล queue_id และ staff_id
      await ticketService.updateTicket(id, formData);
      
      // มอบหมาย queue_id ให้กับ staff ใน backend
      await staffService.assignQueueToStaff({ staffId: formData.staff_id, queueId: formData.queue_id });

      alert('แก้ไข Ticket สำเร็จ');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการแก้ไข Ticket');
    }
  };

  // ตัวเลือกสถานะทั้งหมด
  const statusOptions = [
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Resolved',
    'Closed',
    'Reopened',
    'Escalated',
  ];

  return (
    <div className="edit-ticket-page">
      <h2>แก้ไข Ticket</h2>
      <form onSubmit={handleEditTicket}>
        <label>
          หัวเรื่อง:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          รายละเอียด:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          สถานะ:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          มอบหมายให้พนักงาน:
          <select
            name="staff_id"
            value={formData.staff_id}
            onChange={handleChange}
          >
            <option value="">เลือกพนักงาน</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.id} - {staff.name} ({staff.email})
              </option>
            ))}
          </select>
        </label>
        <label>
          มอบหมายให้ Queue ID:
          <input
            type="text"
            name="queue_id"
            value={formData.queue_id}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">บันทึกการแก้ไข</button>
      </form>
    </div>
  );
};

export default EditTicketPage;
