/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

 import { configureStore } from '@reduxjs/toolkit'
 import reducer from './reducers/index';
 
 const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action)
  }

  return Promise.resolve(action).then(store.dispatch)
} 

 // we are adding composeWithDevTools here to get easy access to the Redux dev tools
 const store = configureStore({
   reducer,
   devTools: process.env.NODE_ENV !== 'production',
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vanillaPromise),
  });
 
 export default store;