import { act } from 'react';
import { ADD } from '../action-types';

const actionCreators = {
  add() {
    return {
      type: ADD,
    };
  },
};

export default actionCreators;
