import { addCarActionCreator, updateCarActionCreator } from '../actions/actions.js';


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

const edmundsPopulate = (car) => {
  const {make, model, year, vin} = car;
  const edmundsUrl = EDMUNDS_BASE + `/${make.toLowerCase()}/${model.toLowerCase()}/${year}/vin/${vin}/`;
  console.log('about to fetch '  + 'localhost:3000/sources/' + edmundsUrl);
  return fetch('http://localhost:3000/sources/' + edmundsUrl,
  {
    method: 'GET',
    headers: {'Target-URL': 'www.edmunds.com'},
    redirect: 'follow'
  }
  )
    .then(resp => {
      if(!resp.ok) return car
      return resp.json()
    })
    .then(data => {
      console.log(data);
      return {...car, ...data, edmundsUrl};
    })
    .catch(err => {
      return car
    })
}


console.log(nhtsaPopulate('4S4BSETC9K3341075'))

export const addCar = (vin) => {
  return nhtsaPopulate(vin)
    .then(payload => edmundsPopulate(payload))
    .then(payload => addCarActionCreator(payload));
}
