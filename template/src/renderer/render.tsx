
/* IMPORT */

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import Identity from 'react-component-identity';
import Environment from '@common/enviroment';
import App from './components/app';

/* RENDER */

async function render () {

  const AppContainer = Environment.isDevelopment ? ( await import ( 'react-hot-loader' ) ).AppContainer : Identity;

  reactRender (
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById ( 'app' )
  );

}

/* EXPORT */

export default render;
