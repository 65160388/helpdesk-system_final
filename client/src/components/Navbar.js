import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // สไตล์สำหรับ Navbar

function Navbar({ user, handleLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ฟังก์ชันเพื่อสลับการแสดง dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Helpdesk</h1>
      </div>
      <ul className="navbar-links">
        {user ? (
          <li className="dropdown">
            {/* แสดงชื่อผู้ใช้และ dropdown */}
            <button onClick={toggleDropdown} className="dropdown-button">
              {user.username} <span className="dropdown-icon">▼</span>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/my-account">บัญชีของฉัน</Link></li>
                <li><Link to="/tickets">ตั๋วของฉัน</Link></li>
                <li><Link to="/notifications">การแจ้งเตือน</Link></li>
                <li><button onClick={handleLogout}>ออกจากระบบ</button></li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
