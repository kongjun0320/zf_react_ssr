import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actionCreators from '../store/actionCreators/user';

const LazyUserList = React.lazy(() => import('../component/Users'));

function UserList() {
  const dispatch = useDispatch();
  // const resourceRef = useRef();

  const list = useSelector((state) => state.user.list);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCreators.getUserList());
    }
  }, []);

  // if (!resourceRef.current) {
  //   const promise = dispatch(actionCreators.getUserList());
  //   const resource = wraPromise(promise);
  //   resourceRef.current = resource;
  // }

  return (
    <>
      <div>User 上面</div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {/* <Suspense fallback={<div>loading...</div>}>
        <LazyUserList resource={resourceRef.current} />
      </Suspense> */}
      <div>User 下面</div>
    </>
  );
}

// function wraPromise(promise) {
//   let status = 'pending';
//   let result;
//   let suspender = promise.then(
//     (r) => {
//       status = 'success';
//       result = r;
//     },
//     (e) => {
//       status = 'error';
//       result = e;
//     }
//   );
//   return {
//     read() {
//       if (status === 'pending') {
//         throw suspender;
//       } else if (status === 'error') {
//         throw result;
//       } else if (status === 'success') {
//         return result;
//       }
//     },
//   };
// }

export default UserList;
