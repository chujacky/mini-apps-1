import React from 'react';
import Circle from './Circle.jsx'

var Row = (props) => {
  return (
    <div className="row">
      {props.circles.map((circle) =>{
        return <Circle />
      })}
    </div>
  )
}

export default Row;