import React from 'react';
import Circle from './Circle.jsx'

var Column = (props) => {

  return (
    <div className="column" onClick={props.click} index={props.index}>
      {props.circles.map((circle) =>{
        return <Circle  color={circle}/>
      })}
    </div>
  )
}

export default Column;