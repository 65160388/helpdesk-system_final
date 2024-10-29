// client/src/pages/StaffDashboardPage.js
import React, { useEffect, useState } from 'react';
import ticketService from '../services/ticketService';
import { Container, Row, Col, Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';

const StaffDashboardPage = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [highPriorityTickets, setHighPriorityTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ฟังก์ชันสำหรับดึงข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignedData, statsData] = await Promise.all([
          ticketService.getAssignedTickets(),
          ticketService.getTicketStats(),
        ]);

        setAssignedTickets(assignedData);
        setStats(statsData);
        setHighPriorityTickets(assignedData.filter(ticket => ticket.priority === 'high'));
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>กำลังโหลดข้อมูล...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">เกิดข้อผิดพลาดในการดึงข้อมูล</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Dashboard พนักงาน</h2>

      {/* ภาพรวมสถิติ */}
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>ตั๋วทั้งหมด</Card.Title>
              <h2>{stats.totalTickets}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>ตั๋วที่เปิดอยู่</Card.Title>
              <h2>{stats.openTickets}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>ตั๋วที่ปิดแล้ว</Card.Title>
              <h2>{stats.closedTickets}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ตั๋วที่มีความสำคัญสูง */}
      <Row className="mt-5">
        <Col>
          <h4>ตั๋วที่มีความสำคัญสูง</h4>
          {highPriorityTickets.length === 0 ? (
            <p>ไม่มีตั๋วที่มีความสำคัญสูง</p>
          ) : (
            <ListGroup>
              {highPriorityTickets.map(ticket => (
                <ListGroup.Item key={ticket.id}>
                  <strong>{ticket.subject}</strong>
                  <Badge bg="danger" className="ms-2">ความสำคัญสูง</Badge>
                  <div>สถานะ: {ticket.status}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      {/* ตั๋วที่ได้รับมอบหมาย */}
      <Row className="mt-5">
        <Col>
          <h4>ตั๋วที่ได้รับมอบหมาย</h4>
          {assignedTickets.length === 0 ? (
            <p>คุณไม่มีตั๋วที่ได้รับมอบหมาย</p>
          ) : (
            <ListGroup>
              {assignedTickets.map(ticket => (
                <ListGroup.Item key={ticket.id}>
                  <strong>{ticket.subject}</strong>
                  {ticket.priority === 'high' && (
                    <Badge bg="danger" className="ms-2">ความสำคัญสูง</Badge>
                  )}
                  <div>สถานะ: {ticket.status}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StaffDashboardPage;
