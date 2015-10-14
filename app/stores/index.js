import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import api from '../middleware/api';
import rootReducer from '../reducers/index';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
