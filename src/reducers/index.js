import { combineReducers } from 'redux';
import split from './split';
import restore from './restore';
import splitResults from './split-resullts';

export default combineReducers({
  split,
  restore,
  splitResults,
});
