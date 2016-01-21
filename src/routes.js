import Root from './apps/platform/layouts/Root';
import Dashboard from './apps/platform/layouts/Dashboard';
import About from './apps/platform/layouts/About';
import platformRoutes from './apps/platform/routes';
import productRoutes from './apps/product/routes';

// routes should only interface with layouts
// layouts will then interface with views which are smart components
// views will have many dumb components  (maybe other views?)
export default {
  path: '/',
  component: Root,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    productRoutes,
    platformRoutes
  ]
};
