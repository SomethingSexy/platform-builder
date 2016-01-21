import { combineReducers } from 'redux';
import {platformsById, workingPlatformId} from './platforms';
import categories from './categories';

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  platformsById,
  workingPlatformId,
  categories
});

export default rootReducer;
