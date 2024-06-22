import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div>
      <h3>
        当前登录用户
        <div>{user?.name || '暂无数据'}</div>
      </h3>
    </div>
  );
}

export default Profile;
