import Root from './components/Root.js';
import ProductLayout from './components/Product.js';
import CreateProduct from './containers/CreateProduct.js';
import UpdateProduct from './containers/UpdateProduct.js';

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
