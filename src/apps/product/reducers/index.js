import { combineReducers } from 'redux';
import categories from './categories.js';
import { platformsById } from '../../../common/reducers/platforms.js';

const rootReducer = combineReducers({
  categories,
  platformsById
});

export default rootReducer;
