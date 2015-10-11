import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Root from './handlers/root';
import Dashboard from './handlers/dashboard';
import About from './handlers/about';
import Build from './handlers/build/index';
import BuildPlatform from './handlers/build/platform';
import Platform from './handlers/platform/index';

export default {
  path: '/',
  component: Root,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'build',
      component: Build,
      childRoutes: [
        { path: 'platform', component: BuildPlatform }
        // { path: 'messages/:id',
        //   onEnter: function (nextState, replaceState) {
        //     replaceState(null, '/messages/' + nextState.params.id)
        //   }
        // }
      ]
    },
    { path: 'platform',
      component: Platform
      // childRoutes: [
      //   { path: 'platform', component: Platform }
      // ]
    }
  ]
};


