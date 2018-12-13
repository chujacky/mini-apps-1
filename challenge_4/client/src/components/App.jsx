import React from 'react';
import Board from './Board.jsx';
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      win:false,
      player:1,
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

    this.makeMove = this.makeMove.bind(this);
  }
  
  makeMove() {
    alert(this.state.player);
    var player = this.state.player === 1 ? 2 : 1;
    this.setState({
      player:player
    })
  }

  render() {
    return ( 
      <div>
        <h1>Connect FOUR</h1>
        <Board size={this.state.board} player={this.state.player} click={this.makeMove}/>
      </div> 
    ) 
  }
}

export default App;