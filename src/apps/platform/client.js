// Not sure how to handle CSS yet but I can't included via component files because it fails to load on the server-side
import 'bootstrap/dist/css/bootstrap.css';
import '../../common/components/parts/parts.css';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';
import ReactDOM from 'react-dom';
import configureStore from './stores/index.js';
import { Provider } from 'react-redux';
import fetchComponentData from '../../utils/fetchComponentData.js';
import LoadingContainer from '../../utils/LoadingContainer.js';

const store = configureStore(window.__INITIAL_DATA__ || {}, browserHistory);

function createElement(Component, props) {
  if (Component.needs) {
    fetchComponentData(store.dispatch, [Component], props.params);
  }
  return React.createElement(Component, props);
}

// TODO: This method will return our LoadingContainer component which will
// fetch data and display loading animation
function testRender(props) {
  console.log(props);
  return <LoadingContainer {...props} />;
}

ReactDOM.render(<Provider store={store}><Router children={routes} store={store} history={browserHistory} createElement={createElement} render={testRender} /></Provider>, document.getElementById('app'));
