import React from 'react';

function Card({vin, make, model, year, trim, edmundsUrl}) {
  return(
    <section className="card">
      I am a car, and my VIN is: {vin}.
      My make is {make ? make : 'not available'}.
      My model is {model ? model : 'not available'}.
      My year is {year ? year : 'not available'}.
      My trim package is {trim ? trim : 'not available'}.
      My edmundsUrl is {edmundsUrl ? edmundsUrl : 'not available'}
    </section>
  );
}

export default Card;