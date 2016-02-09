import Root from './layouts/Root.js';
import ProductLayout from './layouts/Product.js';
import CreateProduct from './views/CreateProduct.js';
import UpdateProduct from './views/UpdateProduct.js';
// routes should only interface with layouts
// layouts will then interface with views which are smart components
export default {
  path: '/',
  component: Root,
  childRoutes: [{
    path: 'product',
    component: ProductLayout,
    indexRoute: { component: CreateProduct },
    childRoutes: [{
      path: ':productId/build',
      component: UpdateProduct
    }]
  }]
};
