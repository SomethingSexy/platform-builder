import { combineReducers } from 'redux';
import { platformsById } from '../../../common/reducers/platforms.js';
import categories from './categories.js';

const rootReducer = combineReducers({
  platformsById,
  categories
});

export default rootReducer;
