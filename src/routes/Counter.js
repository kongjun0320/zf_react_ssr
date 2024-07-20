import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import actionCreators from '../store/actionCreators/counter';

function Counter() {
  // const number = useSelector((state) => state.counter.number);
  // const dispatch = useDispatch();
  const [number, setNumber] = useState(0);

  return (
    <div>
      <div>{number}</div>
      <button onClick={() => setNumber(number + 1)}>+</button>
      {/* <button onClick={() => dispatch(actionCreators.add())}>+</button> */}
    </div>
  );
}

export default Counter;
