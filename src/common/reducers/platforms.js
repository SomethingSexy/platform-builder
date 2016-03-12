import _find from 'lodash.find';
import _findindex from 'lodash.findindex';
import update from 'react/lib/update';
import {
  CREATING_PLATFORM, CREATED_PLATFORM, SAVING_PLATFORM, SAVED_PLATFORM, FETCHED_PLATFORM, CREATED_PART, DELETED_PART, FETCHED_PLATFORMS, DELETED_PLATFORM, SAVED_PART
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
      return update(state, {
        parts: { $push: [action.part] }
      });
    case SAVED_PART: {
      const parts = state.parts.map(part => {
        if (part._id !== action.part._id) {
          return part;
        }

        return {
          ...part,
          ...action.part
        };
      });

      return {
        ...state,
        parts
      };
    }
    case DELETED_PART:
      // when a part is created we need to add it to the list of parts
      if (state.parts) {
        const index = _findindex(state.parts, { _id: action.partId });
        if (index > -1) {
          return {
            ...state,
            ...state.parts.slice(index, index + 1)
          };
        }
      }

      return state;

    case DELETED_PLATFORM: {
      const deletedState = Object.assign({}, state);
      delete deletedState[action.platform._id];
      return deletedState;
    }
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
    case FETCHED_PLATFORMS: {
      const platorms = {};
      action.platforms.forEach(platform => {
        platorms[platform._id] = platform;
      });
      return Object.assign({}, state, platorms);
    }
    case CREATED_PART: {
      const platformId = action.part._createdPlatformId;
      return Object.assign({}, state, {
        [platformId]: platforms(state[platformId], action)
      });
    }
    case SAVED_PART:
      return Object.assign({}, state, {
        [action.part._createdPlatformId]: platforms(state[action.part._createdPlatformId], action)
      });
    case DELETED_PART: {
      return Object.assign({}, state, {
        [action.platformId]: platforms(state[action.platformId], action)
      });
    }
    case DELETED_PLATFORM:
      return platforms(state, action);
    default:
      return state;
  }
}
