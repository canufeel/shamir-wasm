import * as types from 'actions/types';

const restore = (state = '', action) => {
  switch (action.type) {
    case types.ON_RESTORE:
      return action.data;
    default:
      return state;
  }
};

export default restore;
