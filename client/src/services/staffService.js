import axios from 'axios';

const API_URL = 'http://localhost:5001/api/staff';
const getAuthToken = () => localStorage.getItem('token');

// ฟังก์ชันสำหรับเพิ่มพนักงานใหม่
const addStaff = async (staffData) => {
  const response = await axios.post(API_URL, staffData, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return response.data;
};

// ฟังก์ชันสำหรับดึงข้อมูลพนักงานทั้งหมด
const getAllStaff = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return response.data;
};

// ฟังก์ชันสำหรับดึงข้อมูลพนักงานตาม ID
const getStaffById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return response.data;
};

// ฟังก์ชันสำหรับมอบหมาย queue ให้กับพนักงาน
const assignQueueToStaff = async ({ staffId, queueId }) => {
  const response = await axios.post(`${API_URL}/assignQueue`, { staffId, queueId }, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return response.data;
};

export default {
  addStaff,
  getAllStaff,
  getStaffById,
  assignQueueToStaff,
};
