import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Root from './layouts/Root';
import Dashboard from './layouts/Dashboard';
import About from './layouts/About';
import Build from './layouts/build/index';
import BuildPlatform from './layouts/build/platform';
import Platform from './layouts/Platform';
import CreatePlatform from './views/platform/CreatePlatform';
import UpdatePlatform from './views/platform/UpdatePlatform';
// routes should only interface with layouts
// layouts will then interface with views which are smart components
// views will have many dumb components  (maybe other views?)
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
      component: Platform,
      indexRoute: { component: CreatePlatform },
      childRoutes: [
        { path: ':platformId/build', component: UpdatePlatform }
      ]
    }
  ]
};
