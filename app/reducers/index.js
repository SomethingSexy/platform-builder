import { combineReducers } from 'redux';
import {
  CREATING_PLATFORM, CREATED_PLATFORM
} from '../actions/platform';

// function selectedReddit(state = 'reactjs', action) {
//   switch (action.type) {
//   case SELECT_REDDIT:
//     return action.reddit;
//   default:
//     return state;
//   }
// }

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  // case INVALIDATE_REDDIT:
  //   return Object.assign({}, state, {
  //     didInvalidate: true
  //   });
  case CREATING_PLATFORM:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case CREATED_PLATFORM:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

// this is used to create the state shape
function postsByReddit(state = { }, action) {
  switch (action.type) {
  // case INVALIDATE_REDDIT:
  case CREATING_PLATFORM:
  case CREATED_PLATFORM:
    return Object.assign({}, state, {
      [action.reddit]: posts(state[action.reddit], action)
    });
  default:
    return state;
  }
}

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  postsByReddit
});

export default rootReducer;
