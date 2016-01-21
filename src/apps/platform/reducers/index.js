import { combineReducers } from 'redux';
import {platformsById, workingPlatformId} from './platforms.js';
import categories from './categories.js';

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  platformsById,
  workingPlatformId,
  categories
});

export default rootReducer;