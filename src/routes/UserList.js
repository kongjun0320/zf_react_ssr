import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actionCreators from '../store/actionCreators/user';

function UserList() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.user.list);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCreators.getUserList());
    }
  });

  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

UserList.loadData = (store) => {
  // 等此 promise 完成后仓库就有数据了，就可以用仓库的数据渲染带真实数据的的组件 HTML 了，再发给客户端
  return store.dispatch(actionCreators.getUserList());
};

export default UserList;
