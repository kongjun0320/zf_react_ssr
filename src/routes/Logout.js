import React from 'react';
import { useDispatch } from 'react-redux';
import actionCreators from '../store/actionCreators/auth';

function Logout() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(actionCreators.logout())}>Logout</button>
    </div>
  );
}

export default Logout;
