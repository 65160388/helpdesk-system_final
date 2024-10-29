require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db');
// const socketIO = require('socket.io');

// ตั้งค่า CORS ให้รองรับการเชื่อมต่อจาก frontend
app.use(cors({
  origin: 'http://localhost:3000', // ระบุโดเมนของ frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ระบุ method ที่จะอนุญาต
  credentials: true // เปิดใช้งานการส่ง cookie หรือ token ข้ามโดเมน
}));

app.use(bodyParser.json());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const queueRoutes = require('./routes/queues');
const reportRoutes = require('./routes/reports');
const knowledgeRoutes = require('./routes/knowledge');
const userReportRoutes = require('./routes/userReport');
const staffRoutes = require('./routes/staff');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/userReport', userReportRoutes);
app.use('/api/staff', staffRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
