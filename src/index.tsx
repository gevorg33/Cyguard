import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import { Provider } from 'react-redux';
import { notification } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';
import App from 'App';
import { configureAmplify, configureAxios } from './services';

import * as serviceWorker from 'serviceWorker';

configureAmplify();
configureAxios();

notification.config({
  duration: 3,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
