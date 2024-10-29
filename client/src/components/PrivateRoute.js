// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // ถ้าไม่มี token ให้ไปหน้า login
  }

  try {
    // ตรวจสอบความถูกต้องของ token
    const decodedToken = jwtDecode(token);

    // ตรวจสอบ token หมดอายุ
    const currentTime = Date.now() / 99999000; // เวลาปัจจุบันเป็นวินาที
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // ลบ token ที่หมดอายุ
      return <Navigate to="/login" />; // นำผู้ใช้ไปยังหน้า login
    }

    return children; // ถ้า token ถูกต้องให้ render children
  } catch (error) {
    // ถ้า token ไม่ถูกต้องให้ลบและนำไปหน้า login
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

