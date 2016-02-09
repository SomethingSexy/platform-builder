import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// import api from '../middleware/api';
import rootReducer from '../reducers/index.js';
import storeEnhancer from 'redux-history-transitions';


export default function configureStore(initialState, history) {
  // pulled my hair out with this one, need to set node logger
  const logger = createLogger({logger: console});
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, logger),
    storeEnhancer(history)
  )(createStore);
  const finalCreateStore = createStoreWithMiddleware(rootReducer, initialState);

  return finalCreateStore;
}
