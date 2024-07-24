import React, { Suspense, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import Users from '../component/Users';
import actionCreators from '../store/actionCreators/user';

const LazyUsers = React.lazy(() => import('../component/Users'));

function UserList() {
  const dispatch = useDispatch();
  const resourceRef = useRef();

  if (!resourceRef.current) {
    const promise = dispatch(actionCreators.getUserList());
    const resource = wrapPromise(promise);
    resourceRef.current = resource;
  }
  return (
    <>
      <div>User 上</div>
      <Suspense fallback={<h1>loading...</h1>}>
        <LazyUsers resource={resourceRef.current} />
      </Suspense>
      <div>User 下</div>
    </>
  );
}

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

export default UserList;
