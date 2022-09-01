import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeSessionIdActionCreator, changeNewSessionIdActionCreator, loadCarsActionCreator } from '../actions/actions.js'
import { getCarsForSessionId } from '../controllers/dbApiController.js'


const SessionPicker = props => {
  const sessionId = useSelector(state => state.cars.sessionId);
  const newSessionId = useSelector(state => state.cars.newSessionId);
  const dispatch = useDispatch();
  const updateNewSessionId = newVal => {
    dispatch(changeNewSessionIdActionCreator(newVal))
  }
  const updateSessionId = async (newVal) => {
    dispatch(changeSessionIdActionCreator(newVal))
    const cars = await getCarsForSessionId(newVal);
    dispatch(loadCarsActionCreator(cars));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSessionId(newSessionId)

  };


  return (
    <section id="session-picker">
      <p>Your current Session ID is: <strong>{sessionId}</strong></p>
      <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" id="newSessionId" value={newSessionId} onChange={(e) => updateNewSessionId(e.target.value)}></input>
        <input type="submit" value="Switch Session"></input>
      </form>
    </section>
  );


};

export default SessionPicker;