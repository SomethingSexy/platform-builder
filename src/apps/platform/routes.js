import Root from './layouts/Root.js';
import Dashboard from './layouts/Dashboard.js';
import About from './layouts/About.js';
import Platform from './layouts/Platform.js';
import CreatePlatform from './views/CreatePlatform.js';
import UpdatePlatform from './views/UpdatePlatform.js';
import CreatePart from './views/CreatePart.js';
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
    component: Platform,
    // indexRoute: { component: CreatePlatform },
    childRoutes: [{
      path: 'create',
      component: Platform,
      indexRoute: { component: CreatePlatform }
    }, {
      path: ':platformId/build',
      component: UpdatePlatform
    }, {
      path: ':platformId/part',
      component: CreatePart
    }]
  }]
};
