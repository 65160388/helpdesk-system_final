import axios from 'axios';

const API_URL = 'http://localhost:5001/api/knowledge';

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

// ฟังก์ชันสำหรับการเพิ่มบทความความรู้ใหม่
const addKnowledge = async (knowledgeData) => {
  try {
    const response = await axios.post(API_URL, knowledgeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error adding knowledge:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับดึงบทความความรู้ทั้งหมด
const getAllKnowledge = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching all knowledge:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับดึงบทความความรู้ตาม ID
const getKnowledgeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching knowledge by ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับแก้ไขบทความความรู้
const updateKnowledge = async (id, knowledgeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, knowledgeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating knowledge:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ฟังก์ชันสำหรับลบบทความความรู้
const deleteKnowledge = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting knowledge:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// รวบรวมทุกฟังก์ชันในรูปแบบ object
const knowledgeService = {
  addKnowledge,
  getAllKnowledge,
  getKnowledgeById,
  updateKnowledge,
  deleteKnowledge,
};

export default knowledgeService;
