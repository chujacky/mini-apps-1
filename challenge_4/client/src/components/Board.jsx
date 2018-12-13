import React from 'react';
import Row from './Row.jsx';

var Board = (props) => {

  return (
    <div id="board">
    {props.size.map((row) =>{
      return <Row circles={row} />
    })}
    </div>
  )

}

export default Board;