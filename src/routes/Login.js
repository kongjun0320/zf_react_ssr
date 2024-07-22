import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import actionCreators from '../store/actionCreators/auth';

function Login() {
  const dispatch = useDispatch();
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const user = { name };
    dispatch(actionCreators.login(user));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名：</label>
        <input type="text" ref={nameRef} />
      </div>
      <input type="submit" value="login" />
    </form>
  );
}

export default Login;
