import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import knowledgeService from '../services/knowledgeService';
import '../styles/EditKnowledgePage.css';

const EditKnowledgePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const data = await knowledgeService.getKnowledgeById(id);
        setFormData({ title: data.title, content: data.content });
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลความรู้');
      }
    };
    fetchKnowledge();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditKnowledge = async (e) => {
    e.preventDefault();
    try {
      await knowledgeService.updateKnowledge(id, formData);
      alert('แก้ไขบทความความรู้สำเร็จ');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการแก้ไขบทความความรู้');
    }
  };

  return (
    <div className="edit-knowledge-page">
      <h2>แก้ไขบทความความรู้</h2>
      <form onSubmit={handleEditKnowledge}>
        <label>
          หัวข้อ:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          เนื้อหา:
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </label>
        <button type="submit">บันทึกการแก้ไข</button>
      </form>
    </div>
  );
};

export default EditKnowledgePage;
