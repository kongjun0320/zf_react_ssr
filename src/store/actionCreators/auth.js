import { push } from 'redux-first-history';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action-types';

const actionCreators = {
  login(user) {
    return function (dispatch, getState, request) {
      return request.post('/api/login', user).then((res) => {
        const { success, data, error } = res.data;
        if (success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
          dispatch(push('/profile'));
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: error,
          });
        }
      });
    };
  },
  logout(user) {
    return function (dispatch, getState, request) {
      return request.get('/api/logout', user).then((res) => {
        const { success } = res.data;
        if (success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          dispatch(push('/login'));
        }
      });
    };
  },
  validate(user) {
    return function (dispatch, getState, request) {
      return request.get('/api/validate', user).then((res) => {
        const { success, data } = res.data;
        if (success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
        }
      });
    };
  },
};

export default actionCreators;
