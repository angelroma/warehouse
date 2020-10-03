import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './Store/index'
import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import './theme.scss'
import './theme.less'
ReactDOM.render(
  <ConfigProvider locale={esEs}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ConfigProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
