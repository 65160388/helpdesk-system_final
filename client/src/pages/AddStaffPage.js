import React, { useState } from 'react';
import staffService from '../services/staffService';

const AddStaffPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'staff' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await staffService.addStaff(formData);
      alert('เพิ่มพนักงานสำเร็จ');
      setFormData({ name: '', email: '', role: 'staff' });
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มพนักงาน');
    }
  };

  return (
    <div className="add-staff-page">
      <h2>เพิ่มพนักงาน</h2>
      <form onSubmit={handleAddStaff}>
        <label>
          ชื่อ:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          อีเมล:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          บทบาท:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">เพิ่มพนักงาน</button>
      </form>
    </div>
  );
};

export default AddStaffPage;
