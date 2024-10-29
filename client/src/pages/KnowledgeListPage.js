import React, { useEffect, useState } from 'react';
import knowledgeService from '../services/knowledgeService';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../styles/KnowledgeListPage.css';

const KnowledgeListPage = () => {
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKnowledgeList = async () => {
      try {
        const data = await knowledgeService.getAllKnowledge();
        setKnowledgeList(data);
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลความรู้');
      }
    };

    const fetchUserRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      }
    };

    fetchKnowledgeList();
    fetchUserRole();
  }, []);

  const handleDelete = async (id) => {
    try {
      await knowledgeService.deleteKnowledge(id);
      alert('ลบบทความสำเร็จ');
      setKnowledgeList(knowledgeList.filter(item => item.id !== id));
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบบทความ');
    }
  };

  const handleCardClick = (id) => {
    navigate(`/knowledge/detail/${id}`);
  };

  return (
    <div className="knowledge-list-page">
      <h2>รายการบทความความรู้</h2>
      <ul>
        {knowledgeList.map((item) => (
          <li
            key={item.id}
            className="knowledge-list-item"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="knowledge-title">{item.title}</div>
            {userRole === 'admin' || userRole === 'staff' ? (
              <div className="knowledge-actions">
                <button onClick={(e) => { e.stopPropagation(); navigate(`/knowledge/edit/${item.id}`); }} className="edit">
                  แก้ไข
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="delete">
                  ลบ
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeListPage;
