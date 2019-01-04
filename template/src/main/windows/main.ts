
/* IMPORT */

import {app, Menu, MenuItemConstructorOptions, shell} from 'electron';
import * as is from 'electron-is';
import * as localShortcut from 'electron-localshortcut';
import Environment from '@common/enviroment';
import pkg from '@root/package.json';
import UMenu from '@main/utils/menu';
import Route from './route';

/* MAIN */

class Main extends Route {

  /* CONSTRUCTOR */

  constructor ( name = 'main', options = { minWidth: 500, minHeight: 425 }, stateOptions = { defaultWidth: 500, defaultHeight: 425 } ) {

    super ( name, options, stateOptions );

  }

  /* SPECIAL */

  initLocalShortcuts () {

    localShortcut.register ( this.win, 'Ctrl+B', () => {
      this.win.webContents.send ( 'bounce' );
    });

  }

  initMenu () {

    const template: MenuItemConstructorOptions[] = UMenu.filterTemplate ([
      {
        label: app.getName (),
        submenu: [
          {
            role: 'about',
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'services',
            submenu: [] ,
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'hide',
            visible: is.macOS ()
          },
          {
            role: 'hideothers',
            visible: is.macOS ()
          },
          {
            role: 'unhide',
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          { role: 'quit' }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          // { role: 'undo' },
          // { role: 'redo' },
          // { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ],
            visible: is.macOS ()
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            role: 'reload',
            visible: Environment.isDevelopment
          },
          {
            role: 'forcereload',
            visible: Environment.isDevelopment
          },
          {
            role: 'toggledevtools',
            visible: Environment.isDevelopment
          },
          {
            type: 'separator',
            visible: Environment.isDevelopment
          },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'close' },
          { role: 'minimize' },
          {
            role: 'zoom',
            visible: is.macOS ()
          },
          {
            type: 'separator',
            visible: is.macOS ()
          },
          {
            role: 'front',
            visible: is.macOS ()
          }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: () => shell.openExternal ( pkg.homepage )
          },
          {
            label: 'Support',
            click: () => shell.openExternal ( pkg.bugs.url )
          },
          { type: 'separator' },
          {
            label: 'View Changelog',
            click: () => shell.openExternal ( `${pkg.homepage}/blob/master/CHANGELOG.md` )
          },
          {
            label: 'View License',
            click: () => shell.openExternal ( `${pkg.homepage}/blob/master/LICENSE` )
          }
        ]
      }
    ]);

    const menu = Menu.buildFromTemplate ( template );

    Menu.setApplicationMenu ( menu );

  }

}

/* EXPORT */

export default Main;
