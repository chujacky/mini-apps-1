//setup board - view

var board = [
[0,0,0],
[0,0,0],
[0,0,0]
]

for (var i = 0; i < 3; i++) {
  var div = document.createElement('div');
  div.id = ('row' + i);
  div.classList.add('row');
  document.getElementById('container').appendChild(div);
  for (var j = 0; j < 3; j++) {
    var box = document.createElement('button');
    box.classList.add("button", "col" + j, "row" + i);
    box.style.width = '100px';
    box.style.height = '100px';
    box.style.verticalAlign= 'top';
    document.getElementById('row' + i).appendChild(box);
  }
};

document.getElementById('restartButton').onclick = function() {
  for (var i = 0; i < buttons.length; i++){
    buttons[i].disabled = false; 
    buttons[i].innerHTML = "";
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
  console.log(board);
};


var makeMove = function(nextMove) {
  console.log(this);
  updateBoard(this);
  this.innerHTML = next;
  if (next === 'X') {
    next = 'O';
  } else {
    next = 'X';
  }
};

var checkBoard = function(board) {
    if (checkRow.call(this,board) || checkCols.call(this,board) || checkDiagonals()) {
      for (var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true; 
      }
      document.getElementById('result').innerHTML = this.innerHTML + ' wins!'
    }
};

var checkRow = function(board) {
  var row = Number(this.classList[2].substring(3));
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] !== this.innerHTML){
      return false;
    }
  };
  return true;
};

var checkCols = function(board) {
  var col = Number(this.classList[1].substring(3));
  for (var i = 0; i < board.length; i++) {
    if (board[i][col] !== this.innerHTML){
      return false;
    }
  };
  return true;
};


var checkDiagonals = function() {
  
}

