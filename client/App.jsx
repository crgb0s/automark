import React from 'react';
import CardsDisplay from './components/CardsDisplay.jsx'
import CardCreator from './components/CardCreator.jsx'

const App = props => {
  return(
    <section id="app-container" className="center">
      <h1 className="title">Automark</h1>
      <h2 className="subtitle">A Bookmarking tool to help you find the perfect used vehicle</h2>
      <CardCreator/>
      <CardsDisplay/>
    </section>
  );
};

export default App