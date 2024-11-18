import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ticketService from '../services/ticketService';
import staffService from '../services/staffService';
import '../styles/EditTicketPage.css';

const EditTicketPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: '',
    staff_id: '',
    queue_id: '',
  });
  const [staffList, setStaffList] = useState([]);
  const [userRole, setUserRole] = useState('');

  const statusFlow = {
    New: 'Assigned',
    Assigned: 'In Progress',
    'In Progress': ['Pending', 'Resolved'],
    Pending: 'In Progress',
    Resolved: 'Closed',
    Closed: null,
    Reopened: 'Assigned',
  };

  const statusOptions = Object.keys(statusFlow);

  useEffect(() => {
    const fetchUserRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role || '');
      }
    };

    const fetchData = async () => {
      try {
        const ticketData = await ticketService.getTicketById(id);
        const staffData = await staffService.getAllStaff();

        setFormData({
          subject: ticketData.subject,
          description: ticketData.description,
          status: ticketData.status,
          staff_id: ticketData.staff_id || '',
          queue_id: ticketData.queue_id || '',
        });
        setStaffList(staffData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
    };

    fetchUserRole();
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await ticketService.updateTicket(id, formData);

      if (formData.staff_id) {
        await staffService.assignQueueToStaff({
          staffId: formData.staff_id,
          queueId: formData.queue_id,
        });
      }

      alert('บันทึกการแก้ไขสำเร็จ');
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกการแก้ไข');
    }
  };

  const handleNextStatus = async () => {
    let nextStatus = statusFlow[formData.status];
    if (Array.isArray(nextStatus)) {
      nextStatus = nextStatus[0]; // กรณีมีหลายทางเลือก
    }

    if (nextStatus) {
      try {
        const updatedFormData = { ...formData, status: nextStatus };
        await ticketService.updateTicket(id, updatedFormData);
        setFormData(updatedFormData);
        alert(`สถานะถูกเปลี่ยนเป็น "${nextStatus}" สำเร็จ`);
      } catch (error) {
        console.error('Error updating status:', error);
        alert('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
      }
    } else {
      alert('ไม่สามารถเปลี่ยนสถานะถัดไปได้');
    }
  };

  const handleReject = async () => {
    try {
      const updatedFormData = { ...formData, status: 'Rejected' };
      await ticketService.updateTicket(id, updatedFormData);
      setFormData(updatedFormData);
      alert('สถานะถูกเปลี่ยนเป็น "Rejected" สำเร็จ');
    } catch (error) {
      console.error('Error rejecting ticket:', error);
      alert('เกิดข้อผิดพลาดในการ Reject');
    }
  };

  return (
    <div className="edit-ticket-page">
      <h2>{userRole === 'admin' ? 'มอบหมายงานให้พนักงาน' : 'แก้ไขปัญหา'}</h2>
      <form onSubmit={handleSaveChanges}>
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
          {userRole === 'admin' ? (
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
          ) : (
            <input
              type="text"
              name="status"
              value={formData.status}
              readOnly
              className="readonly-input"
            />
          )}
        </label>
        {userRole === 'admin' && (
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
                  {staff.id} - {staff.first_name} {staff.last_name} ({staff.email})
                </option>
              ))}
            </select>
          </label>
        )}
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
        <div className="button-group">
          {userRole === 'staff' && (
            <>
              <button
                type="button"
                onClick={handleNextStatus}
                disabled={!statusFlow[formData.status]}
              >
                เปลี่ยนสถานะถัดไป
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="reject-button"
                disabled={formData.status === 'Rejected'}
              >
                Reject
              </button>
            </>
          )}
          {userRole === 'admin' && (
            <button type="submit">
              มอบหมายงาน
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditTicketPage;
