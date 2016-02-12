import {
  FETCHED_CATEGOIRES
} from '../../../common/actions/categories.js';

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

function categories(state = { }, action) {
  switch (action.type) {
  case FETCHED_CATEGOIRES:
    return Object.assign({}, state, posts(state, action));
  default:
    return state;
  }
}

export default categories;
