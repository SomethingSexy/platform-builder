import _find from 'lodash.find';
import _findindex from 'lodash.findindex';
import update from 'react/lib/update';
import {
  CREATING_PLATFORM,
  CREATED_PLATFORM,
  SAVING_PLATFORM,
  SAVED_PLATFORM,
  FETCHED_PLATFORM,
  CREATED_PART,
  DELETED_PART,
  FETCHED_PLATFORMS,
  DELETED_PLATFORM,
  SAVED_PART,
  CREATED_PART_GROUP
} from '../actions/platform.js';

// helper function to hanle single platform updates
function platform(state = {}, action) {
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
      if (state.parts) {
        const index = _findindex(state.parts, { _id: action.partId });
        if (index > -1) {
          return update(state, {
            parts: { $splice: [[index, 1]] }
          });
        }
      }

      return state;
    case CREATED_PART_GROUP: {
      return update(state, {
        partGroups: { $push: [action.group] }
      });
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
        [action.platform._id]: platform(state[action.platform._id], action)
      });
    case SAVING_PLATFORM:
      return state;
    case SAVED_PLATFORM:
      return Object.assign({}, state, {
        [action.platform._id]: platform(state[action.platform._id], action)
      });
    case FETCHED_PLATFORM:
      return Object.assign({}, state, {
        [action.platform._id]: platform(state[action.platform._id], action)
      });
    case FETCHED_PLATFORMS: {
      const platforms = {};
      action.platforms.forEach(plat => {
        platforms[plat._id] = plat;
      });
      return Object.assign({}, state, platforms);
    }
    case CREATED_PART: {
      const platformId = action.part._createdPlatformId;
      return Object.assign({}, state, {
        [platformId]: platform(state[platformId], action)
      });
    }
    case SAVED_PART:
      return Object.assign({}, state, {
        [action.part._createdPlatformId]: platform(state[action.part._createdPlatformId], action)
      });
    case DELETED_PART: {
      return Object.assign({}, state, {
        [action.platformId]: platform(state[action.platformId], action)
      });
    }
    case CREATED_PART_GROUP: {
      return Object.assign({}, state, {
        [action.platformId]: platform(state[action.platformId], action)
      });
    }
    case DELETED_PLATFORM: {
      const deletedState = Object.assign({}, state);
      delete deletedState[action.platform._id];
      return deletedState;
    }
    default:
      return state;
  }
}
