import React from 'react';
import Circle from './Circle.jsx'

var Row = (props) => {
  return (
    <div className="row">
      {props.circles.map((circle) =>{
        return <Circle player={props.player} click={props.click} row={props.row} />
      })}
    </div>
  )
}

export default Row;