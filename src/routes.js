import Root from './apps/platform/layouts/Root';
import Dashboard from './apps/platform/layouts/Dashboard';
import About from './apps/platform/layouts/About';
import platformRoutes from './apps/platform/routes';
import productRoutes from './apps/product/routes';

// TODO: This is currently not being used but could in the future.
// Instead each app has its own routes and server.js is pulling those in as necessary
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
