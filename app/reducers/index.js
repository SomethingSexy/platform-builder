import { combineReducers } from 'redux';
import platforms from './platforms';
import categories from './categories';

// state shape here would be {postsByReddit: {}}
const rootReducer = combineReducers({
  platforms,
  categories
});

export default rootReducer;
