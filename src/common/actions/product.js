// not sure if actions should be imported from other actions but trying it for now
import { fetchPlatform } from './platform.js';

export const CREATING_PRODUCT = 'CREATING_PRODUCT';
export const CREATED_PRODUCT = 'CREATED_PRODUCT';

function creatingProduct(product) {
  return {
    type: CREATING_PRODUCT,
    product
  };
}

function createdProduct(product) {
  return {
    type: CREATED_PRODUCT,
    product,
    receivedAt: Date.now(),
    meta: {
      transition: (prevState, nextState, action) => ({
        path: `/product/${action.product.id}/build`
      })
    }
  };
}

function postProduct(product) {
  return dispatch => {
    dispatch(creatingProduct(product));
    return fetch('/api/product', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(json => dispatch(fetchPlatform({ platformId: product.category.id })).then(dispatch(createdProduct(json))));
  };
}

// when we create the product we will probably want to also fetch
// the platform then we can transition to the next component
export function createProduct(product) {
  return (dispatch) => dispatch(postProduct(product));
}
