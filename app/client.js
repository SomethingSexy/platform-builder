import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import configureStore from './stores/index';
import { Provider } from 'react-redux';
import fetchComponentData from './utils/fetchComponentData';


const history = createHistory();
const store = configureStore(window.__INITIAL_DATA__ || {}, history);

function createElement(Component, props) {
  if (Component.needs) {
    fetchComponentData(store.dispatch, [Component], props.params);
  }
  return React.createElement(Component, props);
}

ReactDOM.render( <Provider store={store}><Router children={routes} store={store} history={history} createElement={createElement} /></Provider>, document.getElementById('app'));
