import { combineReducers } from 'redux';
import { modeled } from 'react-redux-form';
import { platformsById, workingPlatform } from '../../../common/reducers/platforms.js';
import categories from './categories.js';

const platforms = combineReducers({
  platformsById,
  workingPlatform: modeled(workingPlatform, 'platforms.workingPlatform')
});

const rootReducer = combineReducers({
  platforms,
  categories
});

export default rootReducer;
