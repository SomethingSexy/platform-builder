import 'bootstrap/css/bootstrap.css!';
import React from 'react';
import Router, { browserHistory, RouterContext } from 'react-router';
import routes from './routes.js';
import ReactDOM from 'react-dom';
import configureStore from './stores/index.js';
import { Provider } from 'react-redux';
import fetchComponentData from '../../utils/fetchComponentData.js';


// const history = createHistory();
const store = configureStore(window.__INITIAL_DATA__ || {}, browserHistory);

function createElement(Component, props) {
  if (Component.needs) {
    fetchComponentData(store.dispatch, [Component], props.params);
  }
  return React.createElement(Component, props);
}

function testRender(props) {
  console.log('in test render');
 console.log(props);
 return <RouterContext {...props}/>;
}

ReactDOM.render( <Provider store={store}><Router children={routes} store={store} history={browserHistory} createElement={createElement} render={testRender} /></Provider>, document.getElementById('app'));
