import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'store';
import App from './app';

const store = createStore();

export const generateRootComponent = (_store) => {
  return () => (
    <Provider store={ _store }>
      <App />
    </Provider>
  );
};

const Root = generateRootComponent(store);

export default Root;
