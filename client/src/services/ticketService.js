import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// ฟังก์ชันเพื่อดึง Header การตรวจสอบสิทธิ์
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Sending token:', token); // ตรวจสอบ token ที่ถูกส่งไป
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ฟังก์ชันสำหรับการสร้าง Queue ใหม่
const createQueue = async (queueData) => {
  try {
    const response = await axios.post(`${API_URL}/queues/create`, queueData, getAuthHeaders());
    return response.data; // ควรจะได้รับ { message: 'สร้าง Queue สำเร็จ', queue_id }
  } catch (error) {
    console.log('Error in createQueue:', error.response ? error.response.data : error.message); // ตรวจสอบ error
    throw error;
  }
};

// ฟังก์ชันสำหรับการสร้าง Ticket เดี่ยว (ถ้ายังต้องการใช้งาน)
const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_URL}/tickets/create`, ticketData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in createTicket:', error.response ? error.response.data : error.message); // ตรวจสอบ error
    throw error;
  }
};

// ฟังก์ชันสำหรับการดึง Tickets ทั้งหมด
const getAllTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets/all`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in getAllTickets:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับการดึง Ticket ตาม ID
const getTicketById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tickets/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in getTicketById:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับการอัปเดต Ticket
const updateTicket = async (id, ticketData) => {
  try {
    const response = await axios.put(`${API_URL}/tickets/edit/${id}`, ticketData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in updateTicket:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับการลบ Ticket
const deleteTicket = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tickets/delete/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in deleteTicket:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับการดึงตั๋วของผู้ใช้
const getUserTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets/my-tickets`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log('Error in getUserTickets:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับการดึงข้อมูลคิวทั้งหมด
const getQueueList = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error in getQueueList:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// รวบรวมทุกฟังก์ชันในรูปแบบ object
const ticketService = {
  createQueue,
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getUserTickets,
  getQueueList,
};

export default ticketService;

