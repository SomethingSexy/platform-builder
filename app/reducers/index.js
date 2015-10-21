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

function posts(state = {}, action) {
  switch (action.type) {
  case CREATED_PLATFORM:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.platform);
  default:
    return state;
  }
}

// this is used to create the state shape
// what gets return here is at the root of the store 
// so postsByReddit: {
//   'key' : {}
//
// }
function platforms(state = { }, action) {
  switch (action.type) {
  case CREATING_PLATFORM:
    return state;
  case CREATED_PLATFORM:
    console.log(action);
    return Object.assign({}, state, {
      [action.platform.id]: posts(state[action.platform.id], action)
    });
  default:
    return state;
  }
}

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  platforms
});

export default rootReducer;
