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
   sessionId: 123,
   newSessionId: 123,
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
       const carsList = [];
       for(const car of state.carsList){
         if(car.vin !== action.payload) carsList.push(car);
       }
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
       };
     }

     case types.CHANGE_SESSION_ID: {
      const sessionId = action.payload;
      return {
        ...state,
        sessionId
      };
    }

    case types.CHANGE_NEW_SESSION_ID: {
      const newSessionId = action.payload;
      return {
        ...state,
        newSessionId
      };
    }

    case types.LOAD_CARS: {
      const carsList = action.payload;
      const totalCars = carsList.length;
      return {
        ...state,
        carsList,
        totalCars
      };
    }
 
     default: {
       return state;
     }
   }

 };
 
 export default carsReducer;
 