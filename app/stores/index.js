import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// import api from '../middleware/api';
import rootReducer from '../reducers/index';

const cs = createStore;

// const finalCreateStore = compose(
//   applyMiddleware(thunk)
// )(createStore);
// pulled my hair out with this one, need to set node logger
const logger = createLogger({logger: console});
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(cs);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
