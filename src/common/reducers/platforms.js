import {
  CREATING_PLATFORM, CREATED_PLATFORM, SAVING_PLATFORM, SAVED_PLATFORM, FETCHED_PLATFORM, CREATED_PART, DELETED_PART, FETCHED_PLATFORMS
} from '../actions/platform.js';

function platforms(state = {}, action) {
  switch (action.type) {
  case CREATED_PLATFORM:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.platform);
  case SAVED_PLATFORM:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.platform);
  case FETCHED_PLATFORM:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    }, action.platform);
  case CREATED_PART:
    // when a part is created we need to add it to the list of parts
    if (!state.parts) {
      state.parts = [];
    }
    state.parts.push(action.part);
    return state;
  case DELETED_PART:
    // when a part is created we need to add it to the list of parts
    if (state.parts) {
      const index = state.parts.indexOf(action.part._id);
      // TODO: this should be slice instead
      if (index > -1) {
        state.parts.splice(index, 1);
      }
    }
    return state;
  default:
    return state;
  }
}

export function platformsById(state = { }, action) {
  switch (action.type) {
  case CREATING_PLATFORM:
    return state;
  case CREATED_PLATFORM:
    return Object.assign({}, state, {
      [action.platform._id]: platforms(state[action.platform._id], action)
    });
  case SAVING_PLATFORM:
    return state;
  case SAVED_PLATFORM:
    return Object.assign({}, state, {
      [action.platform._id]: platforms(state[action.platform._id], action)
    });
  case FETCHED_PLATFORM:
    return Object.assign({}, state, {
      [action.platform._id]: platforms(state[action.platform._id], action)
    });
  case FETCHED_PLATFORMS:
    const platorms = {};
    action.platforms.forEach(platform => {
      platorms[platform._id] = platform;
    });
    return Object.assign({}, state, platorms);
  case CREATED_PART:
    const platformId = action.part._createdPlatformId;
    return Object.assign({}, state, {
      [platformId]: platforms(state[platformId], action)
    });
  case DELETED_PART:
    const deleteId = action.part._createdPlatformId;
    return Object.assign({}, state, {
      [deleteId]: platforms(state[deleteId], action)
    });
  default:
    return state;
  }
}

// this will be used to store the current platform that is being worked on
export function workingPlatformId(state = {}, action) {
  switch (action.type) {
  case CREATED_PLATFORM:
    return action.platform._id;
  case FETCHED_PLATFORM:
    return action.platform._id;
  default:
    return state || null;
  }
}