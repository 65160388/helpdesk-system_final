import React, { useState } from 'react';
import knowledgeService from '../services/knowledgeService';
import '../styles/AddKnowledgePage.css';

const AddKnowledgePage = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddKnowledge = async (e) => {
    e.preventDefault();
    try {
      await knowledgeService.addKnowledge(formData);
      alert('เพิ่มบทความความรู้สำเร็จ');
      setFormData({ title: '', content: '' });
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มบทความความรู้');
    }
  };

  return (
    <div className="add-knowledge-page">
      <h2>เพิ่มบทความความรู้</h2>
      <form onSubmit={handleAddKnowledge}>
        <label>
          หัวข้อ:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          เนื้อหา:
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </label>
        <button type="submit">เพิ่มบทความ</button>
      </form>
    </div>
  );
};

export default AddKnowledgePage;
