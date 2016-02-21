import { combineReducers } from 'redux';
import { platformsById } from '../../../common/reducers/platforms.js';
import categories from './categories.js';
import { partsById } from './parts.js';

const rootReducer = combineReducers({
  platformsById,
  categories,
  partsById
});

export default rootReducer;
