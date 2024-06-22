import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action-types';

const initialState = {
  user: null,
  error: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        user: null,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        user: null,
        error: null,
      };

    default:
      return state;
  }
}

export default auth;
