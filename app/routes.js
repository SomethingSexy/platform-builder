import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Root from './handlers/root';
import Dashboard from './handlers/dashboard';
import About from './handlers/about';


export default {
  path: '/',
  component: Root,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About }
    // { path: 'inbox',
      // component: Inbox
      // childRoutes: [
      //   { path: '/messages/:id', component: Message },
      //   { path: 'messages/:id',
      //     onEnter: function (nextState, replaceState) {
      //       replaceState(null, '/messages/' + nextState.params.id)
      //     }
      //   }
      // ]
    // }
  ]
};


