import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <ul style={{ display: 'flex', listStyleType: 'none' }}>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/">Home</Link>
      </li>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/counter">Counter</Link>
      </li>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/user">User</Link>
      </li>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/login">Login</Link>
      </li>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/logout">Logout</Link>
      </li>
      <li style={{ width: '200px', textAlign: 'center' }}>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
}

export default Header;
