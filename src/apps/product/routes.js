import Build from './layouts/index.js';
import BuildPlatform from './layouts/platform.js';

// routes should only interface with layouts
// layouts will then interface with views which are smart components
// views will have many dumb components  (maybe other views?)
export default {
  path: 'build',
  component: Build,
  childRoutes: [{
    path: 'platform', component: BuildPlatform
  }, {
    path: 'product',
    component: Platform,
    indexRoute: { component: CreatePlatform },
    childRoutes: [{
      path: ':productId/build',
      component: UpdatePlatform
    }, {
      path: ':productId/part',
      component: CreatePart
    }]
  }
  ]
};
