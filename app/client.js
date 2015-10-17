import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import configureStore from './stores/index';
import { Provider } from 'react-redux';

const store = configureStore({});

ReactDOM.render( <Provider store={store}><Router children={routes} store={store} history={createHistory()} /></Provider>, document.getElementById('app'));
