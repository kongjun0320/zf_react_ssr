import axios from 'axios';
import { ADD_USER, SET_USER_LIST } from '../action-types';

const actionCreators = {
  getUserList() {
    return function (dispatch, getState) {
      return axios.get('http://localhost:3333/api/users').then((response) => {
        const { data } = response.data;
        dispatch({
          type: SET_USER_LIST,
          payload: data,
        });
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
