// src/components/RoleRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const RoleRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');

  // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
  if (!token) {
    console.warn('No token found. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  try {
    // Decode token เพื่อดึงข้อมูล role
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken); // Debug: ดูข้อมูล token ที่ถอดรหัสแล้ว

    const userRole = decodedToken.role;
    console.log('User Role:', userRole); // Debug: ดูค่า role ของ user

    // ถ้า role ของ user อยู่ใน allowedRoles ให้แสดง component
    if (allowedRoles.includes(userRole)) {
      return children;
    }

    // ถ้า role ของ user ไม่อยู่ใน allowedRoles ให้ redirect ไป unauthorized
    console.warn(
      `Unauthorized access. User Role: ${userRole}, Allowed Roles: ${allowedRoles}`
    );
    return <Navigate to="/unauthorized" />;
  } catch (error) {
    // ถ้ามีข้อผิดพลาดในการถอดรหัส token เช่น token หมดอายุ
    console.error('Invalid or expired token:', error.message);
    localStorage.removeItem('token'); // ลบ token ที่ไม่ถูกต้องออก
    return <Navigate to="/login" />;
  }
};

export default RoleRoute;
