import { createStore, combineReducers } from 'redux';

import movies from './reducers/movies';

const reducer = combineReducers({
  movies
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
