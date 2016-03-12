import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { platformsById } from '../../../common/reducers/platforms.js';
import categories from './categories.js';

const platforms = combineReducers({
  platformsById
});

const rootReducer = combineReducers({
  platforms,
  form: formReducer,
  categories
});

export default rootReducer;
