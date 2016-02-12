import { combineReducers } from 'redux';
import { platformsById, workingPlatformId } from '../../../common/reducers/platforms.js';
import categories from './categories.js';
import { partsById } from './parts.js';

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  platformsById,
  workingPlatformId,
  categories,
  partsById
});

export default rootReducer;
