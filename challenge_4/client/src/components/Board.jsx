import React from 'react';
import Column from './Column.jsx';

var Board = (props) => {

  return (
    <div id="board">
    {props.board.map((col, index) =>{
      return <Column circles={col} click={props.click.bind(null, index)} />
    })}
    </div>
  )

}

export default Board;