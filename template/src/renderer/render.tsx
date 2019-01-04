
/* IMPORT */

import '@renderer/template/index.scss';

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import Identity from 'react-component-identity';
import {Router} from 'react-router-static';
import Environment from '@common/enviroment';
import Routes from './routes';

/* RENDER */

async function render () {

  const AppContainer = Environment.isDevelopment ? ( await import ( 'react-hot-loader' ) ).AppContainer : Identity;

  reactRender (
    <AppContainer>
      <Router routes={Routes} />
    </AppContainer>,
    document.getElementById ( 'app' )
  );

}

/* EXPORT */

export default render;
