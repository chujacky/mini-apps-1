import React from 'react';
import Row from './Row.jsx';

var Board = (props) => {

  return (
    <div id="board">
    {props.size.map((row, index) =>{
      return <Row circles={row} player={props.player} click={props.click} row={index}/>
    })}
    </div>
  )

}

export default Board;