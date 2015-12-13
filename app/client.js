import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import configureStore from './stores/index';
import { Provider } from 'react-redux';

const store = configureStore(window.__INITIAL_DATA__ || {});

function createElement(Component, props) {
  if (Component.populateStore) {
    Component.populateStore(store, props);
  }
  console.log('createElement');
  return React.createElement(Component, props);
}

ReactDOM.render( <Provider store={store}><Router children={routes} store={store} history={createHistory()} createElement={createElement} /></Provider>, document.getElementById('app'));
