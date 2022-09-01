import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeNewVINActionCreator } from '../actions/actions.js'
import { addCar, populateCar } from '../controllers/apiController.js'

function CardCreator(props) {
  const dispatch = useDispatch();
  const changeVIN = (inputVIN) => dispatch(changeNewVINActionCreator(inputVIN));

  const newVIN = useSelector(state => state.cars.newVIN);
  const carsList = useSelector(state => state.cars.carsList);
  const alreadyInList = (newVIN) => carsList.some(cars => cars.vin === newVIN);
  const createNewCar = (vin) => {
    dispatch(addCar(vin));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newVINUpper = newVIN.toUpperCase();
    if (newVINUpper.length > 0 && newVINUpper.match(/[A-HJ-NPR-Z0-9]{17}/i)) {
      if(alreadyInList(newVINUpper)){
        alert('You already saved that car');
      } else {
        createNewCar(newVINUpper);
      }
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log('hi we are inside handleSubmit2');
  }

  return (
    <section id="cardCreator">
      <section className='horizontal-form'>
      Vehicle Identification Number:&nbsp;
        <form onSubmit={handleSubmit}>
          <input type="text" id="newVIN" value={newVIN} onChange={(e) => changeVIN(e.target.value)}></input>&nbsp;
          <input type="submit" value="Add Car"></input>
        </form>
      </section>
    </section>
  )
}

export default CardCreator;