import * as types from './types';

export const onSplitPropChange = data => ({
  type: types.SPLIT_PROP_CHANGE,
  data,
});

export const onAddSplitResults = data => ({
  type: types.ADD_SPLIT,
  data,
});

export const onRestore = data => ({
  type: types.ON_RESTORE,
  data
});
