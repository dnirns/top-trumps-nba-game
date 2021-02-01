import React, { useState } from "react";
import data from '../data/data.json'

const Players = props => {


 

  
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * 239))
 
  const handleNext = () => {
    setRandomIndex(Math.floor(Math.random() * 239))
  }

  return (
    <div className="App">
      <h1>{data[randomIndex].firstName} {data[randomIndex].lastName}:</h1>
      <h4>Age: {data[randomIndex].age}</h4>
      <h4>Shooting: {data[randomIndex].shooting}</h4>
      <h4>Handles: {data[randomIndex].dribbling}</h4>
      <h4>Passing: {data[randomIndex].passing}</h4>
      <h4>Block: {data[randomIndex].block}</h4>
      <h4>Dunking: {data[randomIndex].dunking}</h4>
      <h4>Steals: {data[randomIndex].steal}</h4>
      <h4>Rebounding: {data[randomIndex].rebound}</h4>
      <button onClick={handleNext}>NEXT</button>
    </div>
  );
}

export default Players




