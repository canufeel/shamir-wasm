import {
  createStore as configureStore,
  applyMiddleware,
} from 'redux';
import rootReducer from 'reducers';
import logger from 'redux-logger';

const middlewares = [
  logger,
];

const createStore = () => {
  const store = configureStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
  return store;
};

export default createStore;
