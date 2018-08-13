/* eslint-disable */

import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers.js';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools - nope
const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;