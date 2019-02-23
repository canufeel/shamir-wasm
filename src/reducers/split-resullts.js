import * as types from 'actions/types';

const splitResults = (state = [], action) => {
  switch (action.type) {
    case types.ADD_SPLIT:
      return action.data;
    default:
      return state;
  }
};

export default splitResults;
