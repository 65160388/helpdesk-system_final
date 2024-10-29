import axios from 'axios';

const API_URL = 'http://localhost:5001/api/queues'; // เส้นทาง API ของ backend

// ฟังก์ชันสำหรับดึง token จาก localStorage
const getToken = () => {
  return localStorage.getItem('token'); // สมมติว่า token ถูกเก็บไว้ใน localStorage
};

// ฟังก์ชันสำหรับดึงข้อมูลคิวของผู้ใช้
const getMyQueue = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/my-queue`, {
    headers: {
      Authorization: `Bearer ${token}`, // แนบ token ไปกับ header
    },
  });
  return response.data;
};

// ฟังก์ชันสำหรับดึงข้อมูลคิวทั้งหมดสำหรับ admin หรือ staff
const getQueueList = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/list`, {
    headers: {
      Authorization: `Bearer ${token}`, // แนบ token ไปกับ header
    },
  });
  return response.data;
};

// กำหนด object ให้กับตัวแปรก่อน
const queueService = {
  getMyQueue,
  getQueueList,
};

export default queueService;
