import React from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer'; 
import '../styles/HomePage.css';

function HomePage() {
  return (
    <>
      <Navbar />  {/* แสดง Navbar */}

      <div className="home">
        <section className="hero">
          <h1>ยินดีต้อนรับสู่ระบบ Helpdesk</h1>
          <p>โซลูชันที่ครบวงจรสำหรับการจัดการ Ticket การสนับสนุนลูกค้าอย่างมีประสิทธิภาพ</p>
          <a href="/register" className="cta-button">เริ่มต้นใช้งาน</a>
        </section>

        <section className="features">
          <div className="feature">
            <h3>ติดตาม Ticket ของคุณ</h3>
            <p>ติดตาม Ticket ของคุณด้วยการอัปเดตแบบเรียลไทม์ และจัดการกระบวนการได้อย่างราบรื่น</p>
          </div>
          <div className="feature">
            <h3>ทีมสนับสนุน</h3>
            <p>ทีมสนับสนุนของเราพร้อมช่วยคุณแก้ปัญหาหรือคำถามที่คุณอาจมี</p>
          </div>
          <div className="feature">
            <h3>เวิร์กโฟลว์ที่มีประสิทธิภาพ</h3>
            <p>ปรับปรุงเวิร์กโฟลว์ของคุณและเพิ่มความเร็วในการตอบกลับด้วยแดชบอร์ดที่ใช้งานง่าย</p>
          </div>
        </section>
      </div>

      <Footer />  {/* แสดง Footer */}
    </>
  );
}

export default HomePage;
