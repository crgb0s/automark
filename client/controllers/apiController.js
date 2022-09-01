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

const EDMUNDS_BASE = 'https://www.edmunds.com'

const edmundsPopulate = (payload) => {
  const {make, model, year, vin} = payload;
  const edmundsUrl = EDMUNDS_BASE + `/${make.toLowerCase()}/${model.toLowerCase()}/${year}/vin/${vin}/`;
  return fetch(edmundsUrl)
    .then(resp => {
      if(resp.ok) return {...payload, edmundsUrl};
      return {...payload};
    });
}


console.log(nhtsaPopulate('4S4BSETC9K3341075'))

export const addCar = (vin) => {
  return nhtsaPopulate(vin)
    // .then((payload) => edmundsPopulate(payload))
    .then((payload) => addCarActionCreator(payload));
}