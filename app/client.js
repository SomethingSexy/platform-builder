import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import { EventEmitter } from 'events';

const loadingEvents = new EventEmitter();
// const token = rehydrate();

const renderState = {
  element: document.getElementById('app'),
  Handler: null,
  routerState: null
};

const data = {};
// const render = () => {
//   const { element, Handler, routerState } = renderState;
//   loadingEvents.emit('start');
//   // fetchData(token, routerState).then((data) => {
//   loadingEvents.emit('end');
//   React.render(<Handler data={data} loadingEvents={loadingEvents} />, element);
//   // });
// };

// Router.run(getRoutes(token), Router.HistoryLocation, (Handler, routerState) => {
//   renderState.Handler = Handler;
//   renderState.routerState = routerState;
//   render();
// });


ReactDOM.render(<Router routes={routes} history={createBrowserHistory()} />, document.body);
