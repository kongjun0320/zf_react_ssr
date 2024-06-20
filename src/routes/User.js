import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function User() {
  return (
    <>
      <ul>
        <li>
          <Link to="/user/add">Add User</Link>
        </li>
        <li>
          <Link to="/user/list">User List</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default User;
