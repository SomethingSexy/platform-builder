import Root from './layouts/Root';
import Dashboard from './layouts/Dashboard';
import About from './layouts/About';
import Platform from './layouts/Platform';
import CreatePlatform from './views/CreatePlatform';
import UpdatePlatform from './views/UpdatePlatform';
import Build from '../product/layouts/index';
import BuildPlatform from '../product/layouts/platform';
// routes should only interface with layouts
// layouts will then interface with views which are smart components
// views will have many dumb components  (maybe other views?)
export default {
  path: '/',
  component: Root,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    {  path: 'platform',
      component: Platform,
      indexRoute: { component: CreatePlatform },
      childRoutes: [
        { path: ':platformId/build', component: UpdatePlatform }
      ]
    }
  ]
};
