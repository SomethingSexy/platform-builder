import omit from 'lodash.omit';
import {
  SAVING_PART, SAVED_PART, FETCHED_PART
} from '../../../common/actions/part.js';

import { CREATING_PART, CREATED_PART, DELETED_PART } from '../../../common/actions/platform.js';

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
      [action.part._id]: parts(state[action.part._id], action)
    });
  case SAVING_PART:
    return state;
  case SAVED_PART:
    return Object.assign({}, state, {
      [action.part._id]: parts(state[action.part._id], action)
    });
  case FETCHED_PART:
    return Object.assign({}, state, {
      [action.part._id]: parts(state[action.part._id], action)
    });
  // TODO: Need to figure out how we want to handle this
  // case DELETED_PART:
  //   // this should return the new omitted object, don't think it
  //   // edits it in place
  //   return omit(state, action.part.id);
  default:
    return state;
  }
}
