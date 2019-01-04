
/* IMPORT */

import {app} from 'electron';
import {autoUpdater} from 'electron-updater';
import * as contextMenu from 'electron-context-menu';
import * as is from 'electron-is';
import Environment from '@common/enviroment';
import pkg from '@root/package.json';
import Main from './windows/main';
import Window from './windows/window';

/* APP */

class App {

  /* VARIABLES */

  win: Window;

  /* CONSTRUCTOR */

  constructor () {

    this.init ();
    this.events ();

  }

  /* SPECIAL */

  init () {

    this.initAbout ();
    this.initContextMenu ();

  }

  initAbout () {

    if ( !is.macOS () ) return;

    const {productName, version, license, author} = pkg;

    app.setAboutPanelOptions ({
      applicationName: productName,
      applicationVersion: version,
      copyright: `${license} © ${author.name}`,
      version: ''
    });

  }

  initContextMenu () {

    contextMenu ();

  }

  async initDebug () {

    if ( !Environment.isDevelopment ) return;

    const {default: installExtension, REACT_DEVELOPER_TOOLS} = await import ( 'electron-devtools-installer' );

    installExtension ( REACT_DEVELOPER_TOOLS );

  }

  events () {

    this.___windowAllClosed ();
    this.___activate ();
    this.___ready ();

  }

  /* WINDOW ALL CLOSED */

  ___windowAllClosed () {

    app.on ( 'window-all-closed', this.__windowAllClosed.bind ( this ) );

  }

  __windowAllClosed () {

    if ( is.macOS () ) return;

    app.quit ();

  }

  /* ACTIVATE */

  ___activate () {

    app.on ( 'activate', this.__activate.bind ( this ) );

  }

  __activate () {

    if ( this.win && this.win.win ) return;

    this.load ();

  }

  /* READY */

  ___ready () {

    app.on ( 'ready', this.__ready.bind ( this ) );

  }

  __ready () {

    this.initDebug ();

    autoUpdater.checkForUpdatesAndNotify ();

    this.load ();

  }

  /* API */

  load () {

    this.win = new Main ();

  }

}

/* EXPORT */

export default App;
