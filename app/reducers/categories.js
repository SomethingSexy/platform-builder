import {
  FETCHED_CATEGOIRES
} from '../actions/categories';

function posts(state = {}, action) {
  switch (action.type) {
  case FETCHED_CATEGOIRES:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt,
      categories: action.categories
    });
  default:
    return state;
  }
}

// this is used to create the state shape
// what gets return here is at the root of the store 
// so platforms: {
//   'key' : {}
//
// }
function categories(state = { }, action) {
  switch (action.type) {
  case FETCHED_CATEGOIRES:
    return Object.assign({}, state, posts(state, action));
  default:
    return state;
  }
}

export default categories;
