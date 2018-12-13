import React from 'react';
import Board from './Board.jsx';
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      win:false,
      boardSize: [6, 7],
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
    }
  }


  render() {
    return ( 
      <div>
        <h1>Connect FOUR</h1>
        <Board size={this.state.board} />
      </div> 
    ) 
  }
}

export default App;