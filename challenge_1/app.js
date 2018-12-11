//setup board - view
var player1 = prompt('Please enter Player One\'s name');
var player2 = prompt('Please enter Player Two\'s name');
var p1score = 0;
var p2score = 0;
var result = document.getElementById('result');   
var turn = document.getElementById('turn');   
var restart = document.getElementById('restartButton');
var board = [
[0,0,0],
[0,0,0],
[0,0,0]
];

for (var i = 0; i < 3; i++) {
  var div = document.createElement('div');
  div.id = ('row' + i);
  div.classList.add('row');
  document.getElementById('container').appendChild(div);
  for (var j = 0; j < 3; j++) {
    var box = document.createElement('button');
    box.classList.add("button", "col" + j, "row" + i);
    box.id = i * 3 + j;
    document.getElementById('row' + i).appendChild(box);
  }
};

document.getElementById('p1name').textContent = player1 + " (X) " + ": ";
document.getElementById('p2name').textContent = player2 + " (O) " + ": ";


restart.disabled = true;
turn.textContent = player1 + "\'s turn";

restart.onclick = function() {
  restart.disabled = true;
  for (var i = 0; i < buttons.length; i++){
    buttons[i].disabled = false; 
    buttons[i].textContent = "";
    board = [
              [0,0,0],
              [0,0,0],
              [0,0,0]
            ];
    result.textContent = "";
  }
  if (next === 'X') {
    turn.textContent = player1 + "\'s turn";
  } else {
    turn.textContent = player2 + "\'s turn";
  }
};

//controller
var buttons = document.getElementsByClassName('button');

for (var i = 0; i < buttons.length; i++){
  buttons[i].onclick = function() {
    this.disabled = true;
    makeMove.call(this, next);
    checkBoard.call(this, board)
  }
};

//model

var next = 'X';

var updateBoard = function(button) {
  var col = Number(button.classList[1].substring(3));
  var row = Number(button.classList[2].substring(3));
  board[row][col] = next;
};


var makeMove = function(nextMove) {
  updateBoard(this);
  this.textContent = next;
  if (next === 'X') {
    turn.textContent = player2 + "\'s turn";
    next = 'O';
  } else {
    next = 'X';
    turn.textContent = player1 + "\'s turn";
  }
};

var checkBoard = function(board) {
    if (checkRow.call(this, board) || checkCols.call(this, board) || checkDiagonals.call(this, board)) {
      for (var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true; 
      }
     
      if (this.textContent === 'X') {
        p1score++;
        result.textContent = player1 + ' wins!';
      } else {
        p2score++
        result.textContent = player2 + ' wins!';
      }
      document.getElementById('p1score').textContent = p1score;
      document.getElementById('p2score').textContent = p2score;
      next = this.textContent;
      restart.disabled = false;
    } else if (fullBoard(board)) {
      result.textContent = "TIE";
      restart.disabled = false;
    }

};

var checkRow = function(board) {
  var row = Number(this.classList[2].substring(3));
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] !== this.textContent){
      return false;
    }
  };
  return true;
};

var checkCols = function(board) {
  var col = Number(this.classList[1].substring(3));
  for (var i = 0; i < board.length; i++) {
    if (board[i][col] !== this.textContent){
      return false;
    }
  };
  return true;
};


var checkDiagonals = function(board) {
  if (Number(this.id) % 2 !== 0) {
    return false;
  } else if (Number(this.id) % 4 === 0) {
    
    for (var i = 0; i < board.length * board.length; i+=4) {
      if (document.getElementById(i).textContent !== this.textContent) {
        return false;
      }
    } 
  } else {
    for (var i = 2; i < 7; i+=2) {
      if (document.getElementById(i).textContent !== this.textContent) {
        return false;
      }
    } 
  }
  return true;
}

var fullBoard = function(board) {
  for (var i = 0; i < buttons.length; i++){
    if (buttons[i].disabled === false) {
      return false;
    }
  }
  return true;
}

