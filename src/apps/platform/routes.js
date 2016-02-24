import Root from './layouts/Root.js';
import Dashboard from './layouts/Dashboard.js';
import About from './layouts/About.js';
import Platform from './layouts/Platform.js';
import CreatePlatform from './views/CreatePlatform.js';
import UpdatePlatform from './views/UpdatePlatform.js';
import CreatePart from './views/CreatePart.js';
import PlatformList from './views/PlatformList.js';
// routes should only interface with layouts
// layouts will then interface with views which are smart components
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
      component: CreatePart,
      childRoutes: [{
        path: ':partId',
        component: CreatePart
      }]
    }]
  }]
};
