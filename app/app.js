import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';

import './assets/styles/main.scss';
import { render } from 'react-dom';
import React from 'react';
import Root from './components/root/root';

render(
  <Root/>,
  document.querySelector('#app')
);

// Enables hot-reload without page refresh. Removed during `build`
if (module.hot) {
  module.hot.accept();
}
