/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

export const addCarActionCreator = (attributes) => ({
  type: types.ADD_CAR,
  payload: attributes,
});
// add more action creators

export const deleteCarActionCreator = vin => ({
  type: types.DELETE_CAR,
  payload: vin
});

export const changeNewVINActionCreator = newVIN => ({
  type: types.CHANGE_VIN,
  payload: newVIN
});

export const updateCarActionCreator = updates => ({
  type: types.UPDATE_CAR,
  payload: updates
});