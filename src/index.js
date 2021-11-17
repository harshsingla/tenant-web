import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Store, { history } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './lightTheme.less'
import App from './containers/app'
import './index.less'
// import { SipProvider,Sip } from '@evercall/react-sip';
// import { ConsoleSqlOutlined } from '@ant-design/icons';


const { store, persistor } = Store()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        {/* <SipProvider
          host="192.168.10.19"
          port={8088}
          pathname ="/ws" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
          user="901"
          secure={false}
          password={'901'} // usually required (e.g. from ENV or props)
          autoRegister={true} // true by default, see jssip.UA option register
          autoAnswer={true} // automatically answer incoming calls; false by default
          iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
          sessionTimersExpires={3600} // value for Session-Expires header; 120 by default
          // extraHeaders={{ // optional sip headers to send
          //   register: ['X-Foo: foo', 'X-Bar: bar'],
          //   invite: ['X-Foo: foo2', 'X-Bar: bar2']
          // }}
          // iceServers={[ // optional
          //   { urls: ['stun:a.example.com', 'stun:b.example.com'] },
          //   { urls: 'turn:example.com', username: 'foo', credential: '1234' }
          // ]}
          debug={true} // whether to output events to console; false by default
        > */}
            {/* {console.log(Sip)} */}
          <App />

        {/* </SipProvider> */}
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
