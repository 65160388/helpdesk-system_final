import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import knowledgeService from '../services/knowledgeService';
import '../styles/KnowledgeDetailPage.css';

const KnowledgeDetailPage = () => {
    const { id } = useParams();
    const [knowledge, setKnowledge] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchKnowledge = async () => {
            try {
                const data = await knowledgeService.getKnowledgeById(id);
                setKnowledge(data);
            } catch (error) {
                alert('เกิดข้อผิดพลาดในการดึงข้อมูล Knowledge');
            }
        };
        fetchKnowledge();
    }, [id]);

    return (
        <div className="knowledge-detail-page">
            <h2>{knowledge.title}</h2>
            <p>{knowledge.content}</p>
        </div>
    );
};

export default KnowledgeDetailPage;
