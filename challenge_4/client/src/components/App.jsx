import React from 'react';
import Board from './Board.jsx';
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      win:false,
      player:'R',
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]
    }

    this.makeMove = this.makeMove.bind(this);
  }
  
  // componentDidMount() {
  //   var moves =[];
  //   for (var i = 0; i < this.state.board[0].length; i++) {
  //     moves.push([this.state.board.length-1, i]);
  //   }

  //   this.setState({
  //     validMoves: moves
  //   })
  // }

  checkResult(col, row, player) {
    var board = this.state.board;
    var row  
    var checkCol = function(col, row, player) {
      var count = 0;
    
      for (var i = row + 1; i < board[col].length; i++) {
        if (board[col][i] === player) {
          count++;
        } else {
          break;
        }
      }
      for (var i = row; i >= 0; i--) {
        if (board[col][i] === player) {
          count++;
        } else {
          break;
        }
      }
     
      if (count >= 4){
        return true;
      }
      return false;
    }

    var checkRow = function(col, row, player) {
      var count = 0;
      for (var i = col + 1; i < board.length; i++) {
        if (board[i][row] === player) {
          count++;
        } else {
          break;
        }
      }
       for (var i = col; i >=0 ; i--) {
        if (board[i][row] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= 4){
        return true;
      }
      return false;
    }


    if (checkCol(col, row, player) || checkRow(col, row, player)) {
      alert(player + 'won!')
    } else {
      console.log('still tie');
    }
    
  }
  


  makeMove(col) {
    var column = this.state.board[col];
    var row;
    for (row = column.length - 1; row >= 0; row--){
      if (column[row] === 0){
        column[row] = this.state.player;
        break;
      }
    } 

    this.checkResult(col, row, this.state.player)
    var board = this.state.board;
    board[col] = column;
    var player = this.state.player === 'R' ? 'Y': 'R';
     this.setState({
      player:player,
      board: board,
    })

  }

  render() {
    return ( 
      <div>
        <h1>Connect FOUR</h1>
        <Board board={this.state.board} click={this.makeMove} />
      </div> 
    ) 
  }
}

export default App;