import * as types from 'actions/types';

const splitInitialState = {
  threshold: '2',
  sharesNum: '2',
  secret: ''
};

const split = (state = splitInitialState, action) => {
  switch (action.type) {
    case types.SPLIT_PROP_CHANGE:
      return {
        ...state,
        [action.data.key]: action.data.value,
      };
    default:
      return state;
  }
};

export default split;
