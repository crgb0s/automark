import React from 'react';

function Card(props) {
  const {vin, make, model, year, trim, edmundsUrl, mileage, hp} = props;
  console.log(props);
  let listingInfo;
  if(edmundsUrl){
      listingInfo = `According to Edmunds, I have ${hp} horsepower and a current odometer reading of ${mileage} miles`;
  };
  return(

    <section className="card">
      I am a {year} {make} {model}, and my VIN is: {vin}.<br/>
      {listingInfo ? listingInfo : "No online listings found"}
    </section>
  );
}

export default Card;