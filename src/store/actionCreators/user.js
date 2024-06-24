import { ADD_USER, SET_USER_LIST } from '../action-types';

const actionCreators = {
  getUserList() {
    return function (dispatch, getState, request) {
      return request
        .get('/api/users')
        .then((response) => {
          const { data } = response.data;
          dispatch({
            type: SET_USER_LIST,
            payload: data,
          });
          return getState().user.list;
        })
        .catch((error) => {
          console.log('error >>> ', error);
        });
    };
  },
  addUser(user) {
    return {
      type: ADD_USER,
      payload: user,
    };
  },
};

export default actionCreators;
