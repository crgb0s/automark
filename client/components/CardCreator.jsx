import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeNewVINActionCreator, addCarActionCreator } from '../actions/actions.js'
import { fetchCarDetails,  } from '../controllers/apiController.js'
import { addCarToDB } from '../controllers/dbApiController.js';


function CardCreator(props) {

  const dispatch = useDispatch();
  const changeVIN = (inputVIN) => dispatch(changeNewVINActionCreator(inputVIN));


  const {newVIN, carsList, sessionId} = useSelector(state => state.cars);
  const alreadyInList = (newVIN) => carsList.some(cars => cars.vin === newVIN);
  const createNewCar = (vin) => {
    fetchCarDetails(vin)
      .then(carDetails => {
        dispatch(addCarActionCreator(carDetails))
        addCarToDB(sessionId, carDetails)
      })
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