
/* IMPORT */

import '../template/index.scss';
import {ipcRenderer as ipc} from 'electron';
import * as React from 'react';

/* APP */

class App extends React.Component<any,any> {

  /* CONSTRUCTOR */

  constructor ( props ) {

    super ( props );

    this.state = {
      bounce: false
    };

  }

  /* SPECIAL */

  componentDidMount () {

    ipc.on ( 'bounce', this.bounce.bind ( this ) );

  }

  componentWillUnmount () {

    ipc.removeAllListeners ( 'bounce' );

  }

  /* API */

  bounce () {

    this.setState ({
      bounce: true
    });

    setTimeout ( this.unbounce.bind ( this ), 250 );

  }

  unbounce () {

    this.setState ({
      bounce: false
    });

  }

  /* RENDER */

  render () {

    const {bounce} = this.state,
          logoCls = bounce ? 'bounce' : undefined,
          buttonCls = bounce ? 'button disabled' : 'button';

    return (
      <div id="app-content">
        <img id="logo" className={logoCls} src={`file://${__static}/images/icon.png`} width="128" />
        <h1>{{#scoped}}@{{owner}}/{{/scoped}}{{name}}</h1>
        <p>{{description}}</p>
        <div className={buttonCls} onClick={this.bounce.bind ( this )}>BOUNCE</div>
      </div>
    );

  }

}

/* EXPORT */

export default App;
