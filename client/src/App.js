import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import AddKnowledgePage from './pages/AddKnowledgePage';
import AddStaffPage from './pages/AddStaffPage';
import AddTicketPage from './pages/AddTicketPage';
import AdminReportsPage from './pages/AdminReportsPage';
import EditKnowledgePage from './pages/EditKnowledgePage';
import EditTicketPage from './pages/EditTicketPage';
import KnowledgeListPage from './pages/KnowledgeListPage';
import QueueListPage from './pages/QueueListPage';
import MyQueuePage from './pages/MyQueuePage';
import StaffIndexPage from './pages/StaffIndexPage';
import TicketsPage from './pages/TicketsPage';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';
import IndexPage from './pages/IndexPage';
import MyTicketsPage from './pages/MyTicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import KnowledgeDetailPage from './pages/KnowledgeDetailPage';
// import Chat from './components/Chat';
import UserReport from './pages/UserReport';

function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสาธารณะ */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/chat" element={<Chat />} /> */}

        {/* เส้นทางที่ต้องเข้าสู่ระบบก่อน */}
        <Route 
          path="/index" 
          element={
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <TicketsPage />
            </RoleRoute>
          }
        />
        <Route
          path="/tickets/add"
          element={
            <PrivateRoute>
              <AddTicketPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <PrivateRoute>
              <MyTicketsPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/tickets/:ticketId" 
          element={
            <PrivateRoute>
              <TicketDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-queue"
          element={
            <PrivateRoute>
              <MyQueuePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/userReport"
          element={
            <PrivateRoute>
              <UserReport />
            </PrivateRoute>
          }
        />        
        <Route
          path="/queues/list"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <QueueListPage />
            </RoleRoute>
          }
        />

        {/* เส้นทางสำหรับพนักงานและผู้ดูแลระบบ */}
        <Route
          path="/staff"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <StaffIndexPage />
            </RoleRoute>
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <StaffDashboardPage />
            </RoleRoute>
          }
        />
        <Route
          path="/tickets/edit/:id"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <EditTicketPage />
            </RoleRoute>
          }
        />
        {/* เส้นทางสำหรับผู้ดูแลระบบ */}
        <Route
          path="/reports"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminReportsPage />
            </RoleRoute>
          }
        />
        <Route
          path="/staff/add"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AddStaffPage />
            </RoleRoute>
          }
        />

        {/* เส้นทางสำหรับการจัดการฐานความรู้ */}
        <Route
          path="/knowledge"
          element={
            <PrivateRoute>
              <KnowledgeListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/knowledge/add"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <AddKnowledgePage />
            </RoleRoute>
          }
        />
        <Route
          path="/knowledge/detail/:id"
          element={
            <PrivateRoute>
              <KnowledgeDetailPage />
            </PrivateRoute>
          }
        />   
        <Route
          path="/knowledge/edit/:id"
          element={
            <RoleRoute allowedRoles={['admin', 'staff']}>
              <EditKnowledgePage />
            </RoleRoute>
          }
        />

        {/* เพิ่มการป้องกันในเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </Router>
  );
}

export default App;



