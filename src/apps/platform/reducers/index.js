import { combineReducers } from 'redux';
import { modeled, createFormReducer } from 'react-redux-form';
import { platformsById, workingPlatform } from '../../../common/reducers/platforms.js';
import categories from './categories.js';

const platforms = combineReducers({
  platformsById,
  workingPlatform: modeled(workingPlatform, 'platforms.workingPlatform'),
  workingPlatformForm: createFormReducer('platforms.workingPlatform')
});

const rootReducer = combineReducers({
  platforms,
  categories
});

export default rootReducer;
