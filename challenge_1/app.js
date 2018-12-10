//setup board - view
var player1 = prompt('Please enter Player One\'s name');
var player2 = prompt('Please enter Player Two\'s name');
var p1score = 0;
var p2score = 0;
var result = document.getElementById('result');
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
    box.style.width = '100px';
    box.style.height = '100px';
    box.style.fontSize ="20px"
    box.style.verticalAlign= 'top';
    document.getElementById('row' + i).appendChild(box);
  }
};

document.getElementById('p1name').innerHTML = player1 + " (X) " + ": ";
document.getElementById('p1score').style.marginRight = "20px";
document.getElementById('p2name').innerHTML = player2 + " (O) " + ": ";
document.getElementById('scores').style.display = "flex";

document.getElementById('restartButton').onclick = function() {
  for (var i = 0; i < buttons.length; i++){
    buttons[i].disabled = false; 
    buttons[i].innerHTML = "";
    board = [
              [0,0,0],
              [0,0,0],
              [0,0,0]
            ];
    result.innerHTML = "";
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
  this.innerHTML = next;
  if (next === 'X') {
    next = 'O';
  } else {
    next = 'X';
  }
};

var checkBoard = function(board) {
    if (checkRow.call(this, board) || checkCols.call(this, board) || checkDiagonals.call(this, board)) {
      for (var i = 0; i < buttons.length; i++){
        buttons[i].disabled = true; 
      }
     
      if (this.innerHTML === 'X') {
        p1score++;
        result.innerHTML = player1 + ' wins!';
      } else {
        p2score++
        result.innerHTML = player2 + ' wins!';
      }
      document.getElementById('p1score').innerHTML = p1score;
      document.getElementById('p2score').innerHTML = p2score;


      next = this.innerHTML;
    } else if (fullBoard(board)) {
      result.innerHTML = "TIE";
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


var checkDiagonals = function(board) {
  if (Number(this.id) % 2 !== 0) {
    return false;
  } else if (Number(this.id) % 4 === 0) {
    
    for (var i = 0; i < board.length * board.length; i+=4) {
      if (document.getElementById(i).innerHTML !== this.innerHTML) {
        return false;
      }
    } 
  } else {
    for (var i = 2; i < 7; i+=2) {
      if (document.getElementById(i).innerHTML !== this.innerHTML) {
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

