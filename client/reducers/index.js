/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

 import { combineReducers } from 'redux';

 // import all reducers here
 import carsReducer from './carsReducer';
 
 
 // combine reducers
 const reducer = combineReducers({
   // if we had other reducers, they would go here
   cars: carsReducer,
 });
 
 // make the combined reducers available for import
 export default reducer;
 
 