import { combineReducers } from 'redux';
import { modeled, formReducer } from 'react-redux-form';
import { platformsById, workingPlatform, workingPart } from '../../../common/reducers/platforms.js';
import categories from './categories.js';

const platforms = combineReducers({
  platformsById,
  workingPlatform: modeled(workingPlatform, 'platforms.workingPlatform'),
  workingPlatformForm: formReducer('platforms.workingPlatform'),
  workingPart: modeled(workingPart, 'platforms.workingPart'),
  workingPartForm: formReducer('platforms.workingPart')
});

const rootReducer = combineReducers({
  platforms,
  categories
});

export default rootReducer;
