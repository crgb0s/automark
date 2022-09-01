import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteCarFromDB } from '../controllers/dbApiController.js';
import { deleteCarActionCreator } from '../actions/actions.js'



function Card(props) {
  const {vin, make, model, year, trim, edmundsUrl, mileage, hp} = props;
  console.log(props);
  let listingInfo;
  if(edmundsUrl){
      listingInfo = `According to Edmunds, I have ${hp} horsepower and a current odometer reading of ${mileage} miles`;
  };

  const dispatch = useDispatch();
  const {sessionId} = useSelector(state => state.cars);
  const deleteSelf = function(){
    deleteCarFromDB(vin)
    dispatch(deleteCarActionCreator(sessionId, vin));
  }

  return(
    <section className="card">
      I am a {year} {make} {model}, and my VIN is: {vin}.<br/>
      {listingInfo ? listingInfo : "No online listings found"}
      <button onClick={deleteSelf}>Unsave</button>
    </section>

  );
}

export default Card;