import React from 'react';
import Router from 'react-router';
import routes from './routes';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import { EventEmitter } from 'events';

ReactDOM.render(<Router routes={routes} history={createHistory()} />, document.getElementById('app'));
