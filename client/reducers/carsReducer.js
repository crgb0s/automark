/**
 * ************************************
 *
 * @module  carsReducer
 * @author
 * @date
 * @description reducer for cars data
 *
 * ************************************
 */

 import * as types from '../constants/actionTypes';

 const initialState = {
   totalCars: 0,
   carsList: [],
   newVIN: '',
 };
 
 const carsReducer = (state = initialState, action) => { 
   switch (action.type) {
     case types.CHANGE_VIN: {
       const newVIN = action.payload;
       return {
         ...state,
         newVIN
       };
     }

     case types.ADD_CAR: {
       const totalCars = state.totalCars + 1;
       const carsList = state.carsList.slice();
       
       const newCar = {
        ...action.payload
      };
      carsList.push(newCar);
       return {
         ...state,
         totalCars,
         carsList,
         newVin: ''
       };
     }

     case types.DELETE_CAR: {
       const totalCars = state.totalCars > 0 ? state.totalCars - 1 : 0;
       const carsList = state.carsList.slice();

       carsList = carsList.filter(car => car.vin !== action.payload);

       return {
         ...state,
         totalCars,
         carsList
       };
     }
     case types.UPDATE_CAR: {
       const carsList = state.carsList.slice();
       carToUpdate = carsList.find((car) => car.vin = action.payload.vin);
       carToUpdate = {...carToUpdate, ...action.payload};
       return {
         ...state,
         carsList
       }
     }
 
     default: {
       return state;
     }
   }
 };
 
 export default carsReducer;
 