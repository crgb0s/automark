import React from 'react';
import Card from './Card.jsx'
import { useSelector } from 'react-redux'

function CardsDisplay(props){
  const carsList = useSelector(state => state.cars.carsList);
  const cards = []
  for(const car of carsList){
    cards.push(<Card key={car.vin} {...car}/>);
  }
  

  return(
    <section id="cardsDisplay">
    {cards.length > 0 ? cards: 'No cars yet!'}
    </section>
  );
}

export default CardsDisplay;