import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actionCreators from '../store/actionCreators/user';

function UserAdd() {
  const nameRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    // add user
    dispatch(
      actionCreators.addUser({
        id: Date.now(),
        name,
      })
    );
    // go user list
    navigate('/user/list');
  };

  return (
    <form onSubmit={handleSubmit}>
      用户名：
      <input type="text" ref={nameRef} />
      <input type="submit" value="submit" />
    </form>
  );
}

export default UserAdd;
