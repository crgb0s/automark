import { addCarActionCreator } from '../actions/actions.js';


const NHTSA_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";
const DEFAULT_OPTIONS = "?format=json";

const soughtProps = { 'Make': 'make', 'Model': 'model', 'Model Year': 'year', 'Trim': 'trim' };

const nhtsaPopulate = (vin) => {
  return fetch(`${NHTSA_URL}/DecodeVin/${vin}${DEFAULT_OPTIONS}`)
    .then(data => data.json())
    .then(data => data.Results)
    .then((data) => {
      return data.filter(({ Variable }) => Variable in soughtProps)
        .reduce((acc, curr) => {
          return {
            ...acc,
            [soughtProps[curr.Variable]]: curr.Value
          }
        }, {})
    })
    .then((output) => Object.assign({ vin }, output));
}


console.log(nhtsaPopulate('4S4BSETC9K3341075'))

export const addCar = (vin) => {
  return nhtsaPopulate(vin).then((payload) => addCarActionCreator(payload));
}