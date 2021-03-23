import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

import './index.scss';

render(
  <main>
    <App />
  </main>,
  document.getElementById('appMountPoint'),
);
