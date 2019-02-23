import React from 'react';
import { render } from 'react-dom';
import { getModuleAsync } from './wasm';

function renderRoot() {
  const RootContainer = require('./components/root').default;
  render(
    <RootContainer />,
    document.getElementById('root')
  );
}

getModuleAsync().then(() => {
  renderRoot();
});
