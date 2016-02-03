import {
  CREATING_PART, CREATED_PART, SAVING_PART, SAVED_PART, FETCHED_PART
} from '../actions/part.js';

function parts(state = {}, action) {
  switch (action.type) {
  case CREATED_PART:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.part);
  case SAVED_PART:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.part);
  case FETCHED_PART:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.part);
  default:
    return state;
  }
}

export function partsById(state = { }, action) {
  switch (action.type) {
  case CREATING_PART:
    return state;
  case CREATED_PART:
    return Object.assign({}, state, {
      [action.part.id]: parts(state[action.part.id], action)
    });
  case SAVING_PART:
    return state;
  case SAVED_PART:
    return Object.assign({}, state, {
      [action.part.id]: parts(state[action.part.id], action)
    });
  case FETCHED_PART:
    return Object.assign({}, state, {
      [action.part.id]: parts(state[action.part.id], action)
    });
  default:
    return state;
  }
}
