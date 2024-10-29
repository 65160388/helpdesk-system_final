import React, { useEffect, useState } from 'react';
import queueService from '../services/queueService'; // สมมติว่าคุณมี service สำหรับดึงข้อมูลคิว
import '../styles/MyQueuePage.css'; // สร้างไฟล์ CSS สำหรับหน้านี้

const MyQueuePage = () => {
  const [myQueue, setMyQueue] = useState([]); // ประกาศตัวแปร myQueue และ setMyQueue
  const [hasQueue, setHasQueue] = useState(true); // ตัวแปรเพื่อบอกว่ามีคิวหรือไม่

  useEffect(() => {
    const fetchMyQueue = async () => {
      try {
        const data = await queueService.getMyQueue(); // ดึงข้อมูลคิวของผู้ใช้ที่เข้าสู่ระบบ
        if (data.length === 0) {
          setHasQueue(false); // ถ้าไม่มีคิวให้ตั้ง hasQueue เป็น false
        } else {
          setMyQueue(data); // ถ้ามีคิวให้ตั้งค่า myQueue
          setHasQueue(true); // ตั้งค่า hasQueue เป็น true
        }
      } catch (error) {
        console.error('Error fetching queue:', error);
        setHasQueue(false); // ถ้าเกิดข้อผิดพลาดแสดงว่าไม่มีคิว
      }
    };
    fetchMyQueue();
  }, []);

  return (
    <div className="my-queue-page">
      <h2>คิวของฉัน</h2>
      <ul>
        {!hasQueue ? (
          <li>คุณยังไม่มีคิวในระบบ</li> // ข้อความเมื่อไม่มีคิว
        ) : (
          myQueue.map((queueItem) => (
            <li key={queueItem.queue_id}>
              <div className="card-info">
                <strong>เลขคิว:</strong>
                <span>{queueItem.queue_id}</span>
              </div>
              <div className="card-info">
                <strong>หัวข้อ:</strong>
                <span>{queueItem.subject}</span>
              </div>
              <div className="card-info">
                <strong>สถานะ:</strong>
                <span>{queueItem.status}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyQueuePage;
