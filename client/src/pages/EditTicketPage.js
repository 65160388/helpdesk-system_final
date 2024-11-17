import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ticketService from '../services/ticketService';
import staffService from '../services/staffService';
import '../styles/EditTicketPage.css';

const EditTicketPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ subject: '', description: '', status: '', staff_id: '', queue_id: '' });
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูล Ticket
        const ticketData = await ticketService.getTicketById(id);
        console.log('Ticket Data:', ticketData);

        // ดึงข้อมูล Staff
        const staffData = await staffService.getAllStaff();
        console.log('Staff List:', staffData);

        // ตรวจสอบว่า user_id ใน ticket ตรงกับ staff_id ใน staffList
        const matchedStaff = staffData.find((staff) => staff.id === ticketData.user_id) || {};

        // อัปเดต State
        setFormData({
          subject: ticketData.subject,
          description: ticketData.description,
          status: ticketData.status,
          staff_id: matchedStaff.id || '', // ใช้ id ของพนักงาน ถ้าไม่มีให้ใช้ค่าว่าง
          queue_id: ticketData.queue_id || ''
        });
        setStaffList(staffData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
    };

    fetchData();
  }, [id]);

  // อัปเดตค่าใน Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ส่งข้อมูลการแก้ไข
  const handleEditTicket = async (e) => {
    e.preventDefault();
    try {
      await ticketService.updateTicket(id, formData);
      await staffService.assignQueueToStaff({ staffId: formData.staff_id, queueId: formData.queue_id });
      alert('บันทึกการแก้ไขสำเร็จ');
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกการแก้ไข');
    }
  };

  // ตัวเลือกสถานะที่รองรับ
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
            readOnly
            className="readonly-input"
          />
        </label>
        <label>
          รายละเอียด:
          <textarea
            name="description"
            value={formData.description}
            readOnly
            className="readonly-input"
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
            value={formData.staff_id} // ค่าที่เลือกจะตรงกับ staff_id
            onChange={handleChange}
          >
            <option value="">เลือกพนักงาน</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.id} - {staff.first_name} {staff.last_name} ({staff.email})
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
            readOnly
            className="readonly-input"
          />
        </label>
        <button type="submit">บันทึกการแก้ไข</button>
      </form>
    </div>
  );
};

export default EditTicketPage;
