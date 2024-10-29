// src/components/RoleRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const RoleRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // ถ้าไม่มี token ให้ไปหน้า login
  }

  try {
    const decodedToken = jwtDecode(token); // ถอดรหัส token
    const userRole = decodedToken.role; // ดึงข้อมูล role จาก token

    return allowedRoles.includes(userRole) ? (
      children
    ) : (
      <Navigate to="/unauthorized" /> // ถ้า role ไม่ตรงกับ allowedRoles ให้ไปหน้า unauthorized
    );
  } catch (error) {
    // ถ้า token ไม่ถูกต้องหรือหมดอายุ
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default RoleRoute;
