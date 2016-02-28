import Root from './components/Root.js';
import Dashboard from './components/Dashboard.js';
import About from './components/About.js';
import Platform from './components/Platform.js';
import CreatePlatform from './containers/CreatePlatform.js';
import UpdatePlatform from './containers/UpdatePlatform.js';
import CreatePart from './containers/CreatePart.js';
import UpdatePart from './containers/UpdatePart.js';
import PlatformList from './containers/PlatformList.js';

export default {
  path: '/',
  component: Root,
  indexRoute: { component: Dashboard },
  childRoutes: [{
    path: 'about',
    component: About
  }, {
    path: 'platform',
    component: Platform, // root platform wrapper component
    indexRoute: { component: PlatformList }, // listing component
    childRoutes: [{
      path: 'create',
      indexRoute: { component: CreatePlatform }
    }, {
      path: ':platformId/build',
      component: UpdatePlatform
    }, {
      path: ':platformId/part',
      indexRoute: { component: CreatePart },
      childRoutes: [{
        path: ':partId',
        component: UpdatePart
      }]
    }]
  }]
};
