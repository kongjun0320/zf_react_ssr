import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionCreators from '../store/actionCreators/user';

function UserList() {
  const list = useSelector((state) => state.user.list);
  const dispatch = useDispatch();
  // 只会在客户端执行，不会在服务端执行
  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCreators.getUserList());
    }
  }, []);
  return (
    <ul>
      {list?.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
}

// 当前的路由组件在服务器端获取数据的方法
UserList.loadData = (store) => {
  // 等此 promise 完成后仓库就有数据了，就可以用仓库等数据渲染带真实数据的组件 HTML 了
  return store.dispatch(actionCreators.getUserList());
};

export default UserList;
